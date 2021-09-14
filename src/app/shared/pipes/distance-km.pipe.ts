import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceKm'
})
export class DistanceKmPipe implements PipeTransform {

  transform(meters: number): string {
    if(meters)
    {
      return (meters / 1000).toFixed(2).toString();
    }
    else return 'Not Availabale';
  }

}
