import { Component, OnInit } from '@angular/core';
import { title } from 'process';
declare let L;
declare let tomtom: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ChargeIT';

  ngOnInit() {
  }
}
