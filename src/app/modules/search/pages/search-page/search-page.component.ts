import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import tt from "@tomtom-international/web-sdk-maps";
import { OpenchargeService } from 'src/app/core/services/opencharge.service';
import { ChargingStation } from 'src/app/shared/models/chargingStation.model';
import { OpenchargeResponse } from 'src/app/shared/models/opencharge.response';
import { OcdataPipe } from 'src/app/shared/pipes/ocdata.pipe';
import { MapViewComponent } from '../../components/map-view/map-view.component';
import { Charger, SearchParams } from '../../models/charger.model';
import { Coordinates } from 'src/app/shared/models/coordinates.model';
import { LocationService } from 'src/app/core/services/location.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {


  @Input() mapdata: ChargingStation[];

  subscription: Subscription;
  map: tt.Map;
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

  @ViewChild(SearchBarComponent) searchBar: SearchBarComponent;
  @ViewChild(MapViewComponent) mapView: MapViewComponent;
  locationBuffer: Coordinates;
  // chargersPoints: Charger[];
  constructor(
    private openCharge: OpenchargeService,
    private ocdataPipe: OcdataPipe,
    private loader: LoaderService
  ) { }

  ngOnInit() {

  }

  async fun() {
    this.mapdata = [];
    const hotsearchParams = this.searchBar?.searchparams;
    if (hotsearchParams) {
      const types = hotsearchParams.chargerTypes.filter(x => x.isSelected).map(y => y.id);
      const response = await this.openCharge.getChargingPorts(types, hotsearchParams.distance, this.locationBuffer);
      this.showResultsOnMap(response);
    }
  }

  async mapMoved(coordinates: Coordinates) {
    const hotsearchParams = this.searchBar?.searchparams;
    this.locationBuffer = coordinates;
    if (hotsearchParams) {
      const types = hotsearchParams?.chargerTypes?.filter(x => x.isSelected).map(y => y.id);
      this.loader.show();
      const response = await this.openCharge.getChargingPorts(types, hotsearchParams.distance, coordinates);
      this.showResultsOnMap(response);
    }
  }

  showResultsOnMap(apiResponse: OpenchargeResponse[]) {
    this.mapdata = this.ocdataPipe.transform(apiResponse);
    this.mapView.renderMap(this.mapdata);
  }

  closeSidePane() {
    this.openDetails = !this.openDetails;
  }

}
