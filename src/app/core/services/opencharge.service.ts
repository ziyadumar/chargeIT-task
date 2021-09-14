import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coordinates } from 'src/app/shared/models/coordinates.model';
import { OpenchargeResponse } from 'src/app/shared/models/opencharge.response';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class OpenchargeService {
  baseUrl: string;

  constructor(private http: HttpClient,
    private loader: LoaderService
  ) {
    this.baseUrl = 'https://api.openchargemap.io/v3/poi/';
  }

  getChargingPorts(chargerTypes: number[], distance: number = 100, coordinates: Coordinates = { lat: 51.905445, lng: 4.466637 })
    : Promise<OpenchargeResponse[]> {
    const s = `https://api.openchargemap.io/v3/poi/?output=json&camelcase=
    true&distance=50&distanceunit=KM&connectiontypeid=25,2,33&latitude=51.905445&longitude=4.466637`;
    const params = new HttpParams()
      .set('connectiontypeid', chargerTypes?.toString())
      .set('distance', distance?.toString())
      .set('latitude', coordinates?.lat?.toString())
      .set('longitude', coordinates?.lng?.toString());
      this.loader.show();
    return this.http
      .get<OpenchargeResponse[]>(this.baseUrl, { params }).toPromise();
  }
}
