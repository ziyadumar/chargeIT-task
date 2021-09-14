import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show() {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    this.loaderSubject.next(<LoaderState> { show: true });
  }

  hide() {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    this.loaderSubject.next(<LoaderState> { show: false });
  }
}

