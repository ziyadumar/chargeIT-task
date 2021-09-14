import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from 'src/app/shared/models/chargingStation.model';
import { Coordinates } from 'src/app/shared/models/coordinates.model';
import { CaluculateRouteResponse } from 'src/app/shared/models/tomtom-route.response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TomtomService {

  key: string;
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.key = environment.tomTomKey
    this.baseUrl = 'https://api.tomtom.com/';
  }

  async calculateRoute(from: Coordinates, to: Location):
    Promise<CaluculateRouteResponse> {
    const routePath =
      this.baseUrl + `routing/1/calculateRoute/${from.lat},${from.lng}:${to.lat},${to.lon}/json`
    return this.http
      .get<CaluculateRouteResponse>(routePath).toPromise();
  }
}
