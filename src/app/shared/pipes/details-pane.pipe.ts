import { Pipe, PipeTransform } from '@angular/core';
import { TomtomService } from 'src/app/core/services/tomtom.service';
import { Details } from 'src/app/modules/search/models/detailes.model';
import { ChargingStation } from '../models/chargingStation.model';
import { Coordinates } from '../models/coordinates.model';
import { DistanceKmPipe } from './distance-km.pipe';

@Pipe({
  name: 'cnvrtdetails', pure: true
})
export class DetailsPanePipe implements PipeTransform {
  constructor(private tomtomSerive: TomtomService, private distancePipe: DistanceKmPipe) { }

  values: Details;
  async transform(currentlocation: Coordinates, data: ChargingStation): Promise<Details> {
    if (data) {
      const route = await this.tomtomSerive.calculateRoute(currentlocation, data.location);
      return {
        Street: data.address.street,
        Zip: data.address.zip,
        Town: data.address.town,
        Country: data.address.countryCode,
        Latitude: data.location.lat,
        Longitude: data.location.lon,
        'Operator corp': data.operatorName,
        Distance: this.distancePipe.transform(route.routes[0].summary.lengthInMeters) + 'KM',
        Status: data.available ? "Available" : "Occupied",
        Number: data.connectors[0].number,
        'Plug Type': data.connectors[0].type,
        'Max power': data.connectors[0].maxPowerInKW,
        'Pricing info': data.priceInfo
      };
      // return this.values;
    }
    else return null;
  }

}
