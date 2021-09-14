import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OcdataPipe } from 'src/app/shared/pipes/ocdata.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DetailsPaneComponent } from './components/details-pane/details-pane.component';
import { DetailsPanePipe } from 'src/app/shared/pipes/details-pane.pipe';
import { DistanceKmPipe } from 'src/app/shared/pipes/distance-km.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SearchBarComponent, MapViewComponent, SearchPageComponent, DetailsPaneComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    MatCheckboxModule,
    SharedModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    MatCheckboxModule, ReactiveFormsModule
  ],
  providers: [OcdataPipe, DetailsPanePipe, DistanceKmPipe]
})
export class SearchModule { }
