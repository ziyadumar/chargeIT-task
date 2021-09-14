import { Component, OnInit } from '@angular/core';
declare let L;
declare let tomtom: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
      // const map = tomtom.L.map('map', {
      //   key: '1M3xBAJwZOhD74lHj93g5EaT4AwEg129',
      //   basePath: '../assets/sdk',
      //   center: [ 52.360306, 4.876935 ],
      //   zoom: 15,
      //   source : 'vector'
      // });
    }
  }
