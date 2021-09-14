import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OpenchargeService } from 'src/app/core/services/opencharge.service';
import { environment } from 'src/environments/environment';
import { Charger, SearchParams } from '../../models/charger.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() filters = new EventEmitter<SearchParams>();
  chargers: Charger[] = [{
    id: 25,
    name: 'Type 2',
    isSelected: true
  },
  {
    id: 2,
    name: 'CHAdeMO',
    isSelected: true
  },
  {
    id: 33,
    name: 'CCS',
    isSelected: true
  }];
  searchparams: SearchParams;
  input_km: number;

  constructor(private openCharge: OpenchargeService) { }

  ngOnInit(): void {
    this.searchparams = {
      distance: 100,
      chargerTypes: this.chargers
    };
  }

  search() {
    // input value
    this.searchparams.distance = this.input_km < 1 ? environment.openCharge.defaultDistane : this.input_km;
    // types of chargers
    this.searchparams.chargerTypes = this.chargers;
    this.filters.emit(this.searchparams);
  }

}


