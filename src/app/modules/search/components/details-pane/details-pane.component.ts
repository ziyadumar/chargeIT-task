import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChargingStation } from 'src/app/shared/models/chargingStation.model';
import { Coordinates } from 'src/app/shared/models/coordinates.model';
import { DetailsPanePipe } from 'src/app/shared/pipes/details-pane.pipe';
import { Details } from '../../models/detailes.model';

@Component({
  selector: 'app-details-pane',
  templateUrl: './details-pane.component.html',
  styleUrls: ['./details-pane.component.scss']
})
export class DetailsPaneComponent implements OnInit {

  @Input() data: any;
  @Input() currentLocation: Coordinates;
  @Output() close = new EventEmitter<boolean>();
  entries;
  constructor() { }

  details: Details;
  ngOnInit() { }

  closePane() {
    this.close.emit();
  }

}
