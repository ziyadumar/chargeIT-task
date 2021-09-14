import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import tt from "@tomtom-international/web-sdk-maps";
import { env } from 'process';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/core/services/location.service';
import { OpenchargeService } from 'src/app/core/services/opencharge.service';
import { TomtomService } from 'src/app/core/services/tomtom.service';
import { ChargingStation } from 'src/app/shared/models/chargingStation.model';
import { Coordinates } from 'src/app/shared/models/coordinates.model';
import { DetailsPanePipe } from 'src/app/shared/pipes/details-pane.pipe';
import { DetailsPaneComponent } from '../details-pane/details-pane.component';
declare let L;
declare let tomtom: any;
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {
  /**
   *
   */
  @Input() data: ChargingStation;
  @Output() coordinates = new EventEmitter<Coordinates>();
  @ViewChild(DetailsPaneComponent) detailsPane: DetailsPaneComponent;

  subscription: Subscription;
  // map: tt.Map;
  map: any;
  lat: number;
  lon: number;
  // formGroup: FormGroup;
  queryTypeIsFuzzy = false;
  markerStyle = ''
  pinPoint: tt.Marker;
  selectedLatitude: number;
  selectedLongitude: number;
  openDetails: boolean = false;
  showonmap: boolean = false;
  mobileView: boolean = false;
  liveLocation: Coordinates = {
    lat: 23,
    lng: 34
  };
  detailedInfo: any;
  showDetails: boolean;

  constructor(
    private openCharge: OpenchargeService,
    private location: LocationService,
    private detailPipe: DetailsPanePipe
  ) {
  }

  addressPoints = [
    [-33.87, 151.21, 'Sydney'],
    [-37.81, 144.96, 'Melbourne'],
    [-27.46, 153.02, 'Brisbane'],
    [-31.96, 115.84, 'Perth'],
    [-34.93, 138.60, 'Adelaide'],
    [-32.92, 151.75, 'Newcastle'],
    [-28.07, 153.44, 'Gold coast'],
    [-35.31, 149.13, 'Canberra'],
    [-34.42, 150.87, 'Wollongong'],
    [-25.88, 152.56, 'Sunshine coast'],
    [-42.85, 147.29, 'Hobart'],
    [-38.14, 144.32, 'Geelong'],
    [-19.26, 146.78, 'Townsville'],
    [-16.92, 145.75, 'Cairns'],
    [-41.45, 147.13, 'Launceston'],
    [-36.06, 146.92, 'Albury-wodonga'],
    [-12.43, 130.85, 'Darwin'],
    [-27.56, 151.96, 'Toowoomba'],
    [-37.56, 143.84, 'Ballarat'],
    [-34.88, 150.59, 'Shoalhaven']
  ];

  async ngOnInit() {
    try {
      const this_ref = this;
      this.subscription = this.location.getCurrentPosition().subscribe(
        data => {
          this_ref.liveLocation.lat = data.coords.latitude;
          this_ref.liveLocation.lng = data.coords.longitude;
          this_ref.currentLocationMarker();
        });
      this.initializeMap(this.liveLocation);
      this.map.setView([this.liveLocation.lat, this.liveLocation.lng]);
    }
    catch (e) {
      console.log(e);
    }
  }

  // current location
  currentLocationMarker() {
    const this_ref = this;
    // Creating Find Location widget
    var FindLocationControl = tomtom.L.Control.extend({
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control'),
          btn = L.DomUtil.create('div', 'icon-locate_me_btn', container);
        btn.role = 'button';
        btn.title = 'Click me to locate you';
        btn.onclick = function () {
          map.locate({ setView: true, maxZoom: 15 });
        };
        map.on('locationfound', this.displayMarker, this);
        map.on('locationerror', this.showLocationErrorMessage, this);
        return container;
      },
      onRemove: function (map) {
        map.off('locationfound', this.displayMarker, this);
        map.off('locationerror', this.showLocationErrorMessage, this);
      },
      displayMarker: function (e) {
        if (this._marker) {
          this._marker.setLatLng(this_ref.liveLocation);
          return;
        }

        this._marker = L.marker(this_ref.liveLocation, {
          title: 'Your current location',
          icon: L.svgIcon({
            background: {
              icon: 'icon-locate_me_btn',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            },
            icon: null,
            opacity: 1
          })
        }).addTo(this._map);
      },
      showLocationErrorMessage: function () {
        tomtom.messageBox({ closeAfter: 3000 })
          .setContent('Could not find your location')
          .openOn(this._map);
      }
    });
    this.map.addControl(new FindLocationControl());
    // auto panning to the location area
    this.map.setView([this.liveLocation.lat, this.liveLocation.lng], 7);
    // this.coordinates.emit(this.liveLocation);
  }

  // set Map
  initializeMap(currentLocaiton: Coordinates) {
    const this_ref = this;
    this.map = tomtom.L.map('map', {
      key: '1M3xBAJwZOhD74lHj93g5EaT4AwEg129',
      basePath: '/assets/sdk',
      center: [currentLocaiton.lat, currentLocaiton.lng],
      zoom: 7,
      source: 'vector'
    }).setView([51.1657, 10.4515], 6);
    this.map.on('dblclick', async function (e: tt.MapMouseEvent<'dblclick'>) {
      e.preventDefault();
    });

    this.map.on('moveend', async function (e) {
      const newCenter = this_ref.map.getCenter();
      this_ref.searchOn_mapMoved({ lat: newCenter.lat, lng: newCenter.lng })
    });

  }

  closeSidePane() {
    this.openDetails = !this.openDetails;
  }

  // creating a cluster group
  markers = tomtom.L.markerClusterGroup({
    // animate: true,
    // animateAddingMarkers: true,
    iconCreateFunction: function (cluster) {
      return L.divIcon({
        html: `<div style="background-image: url(\'../../../../../assets/marker.png\'); background-size: cover; width: 61px; height: 54px; display: flex; align-items: flex-start; justify-content: center;">
      <div style="display: flex; align-items: center; justify-content: center; font-size: 13px;margin-top: 12px;border-radius: 50px; background-color: white; background-size: cover;width: 25px;height: 25px;"><b>${cluster.getChildCount()} </b></div>
      </div>` });
    }
  });

  renderMap(data: ChargingStation[]) {
    try {
      // remove all existing cluster
      this.markers.clearLayers();
      const this_ref = this;
      data.forEach(function (point: ChargingStation) {
        const customIcon = tomtom.L.icon({
          iconUrl: point.available ? '../../../assets/greencircle.svg' : '../../../assets/redcircle.svg',
          // shadowUrl: '',
          iconSize: [38, 95], // size of the icon
          // shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        var title;
        if (!point.operatorName || point.operatorName === '') title = 'Unknown';
        var marker = tomtom.L.marker(new tomtom.L.LatLng(point.location.lat, point.location.lon), { title: title, icon: customIcon });
        marker.on('mouseover', function (ev) {
          ev.target.openPopup();
        });
        marker.on('click', function (ev: { [key: string]: any, latlng: Coordinates }) {
          this_ref.markerClicked(point);
        });
        marker.bindPopup(title);
        this_ref.markers.addLayer(marker);
      });
      this.map.addLayer(this.markers);
    }
    catch (e) {
      console.log(e);
    }


  }

  async markerClicked(station: ChargingStation) {
    //set data
    this.detailedInfo = station;
    type Result = [string, any][];
    const details = await this.detailPipe.transform(this.liveLocation, station);
    this.detailedInfo = Object.entries(details) as Result;
    // enable details-view
    this.showDetails = true;
  }

  closeDetailedInfo() {
    this.showDetails = false;
  }

  searchOn_mapMoved(newCenter: Coordinates) {
    this.coordinates.emit(newCenter);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
