
import { Observer, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  latitude: number;
  longitude: number;

  constructor() { }

  getCurrentPosition(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          observer.next(position);
          observer.complete();
        },
        (error: any) => {
          observer.error(error);
        }
      );
    });
  }

  setLocation(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
