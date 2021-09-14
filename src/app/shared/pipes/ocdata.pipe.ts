import { Pipe, PipeTransform } from '@angular/core';
import { ChargingStation, Connector } from '../models/chargingStation.model';
import { Connection, OpenchargeResponse } from '../models/opencharge.response';

@Pipe({
  name: 'ocdata', pure: true
})
export class OcdataPipe implements PipeTransform {

  chargingStations: ChargingStation[] = [];
  transform(raw: OpenchargeResponse[]): ChargingStation[] {
    this.chargingStations = [];
    if (raw) {

      raw.forEach(data => {
        const transformed: ChargingStation = {
          address: {
            street: data.addressInfo?.addressLine1,
            zip: data.addressInfo?.postcode,
            town: data.addressInfo?.town,
            countryCode: data.addressInfo?.country.isoCode
          },
          location: {
            lat: data.addressInfo?.latitude,
            lon: data.addressInfo?.longitude,
          },
          operatorName: data.operatorInfo?.title,
          priceInfo: data.usageCost,
          connectors: data.connections?.map((x: Connection) => {
            const y: Connector = {
              maxPowerInKW: x.connectionType?.id.toString(),
              number: x.powerKW?.toString(),
              type: x.connectionType?.title
            };
            return y;
          }),
          available: data.statusType?.isUserSelectable
        };
        this.chargingStations.push(transformed);
      });
      return this.chargingStations;
    } else
      return null;

  }

}
