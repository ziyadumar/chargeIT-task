import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { OcdataPipe } from './pipes/ocdata.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailsPanePipe } from './pipes/details-pane.pipe';
import { DistanceKmPipe } from './pipes/distance-km.pipe';


@NgModule({
  declarations: [LayoutComponent, OcdataPipe, LoaderComponent, DetailsPanePipe, DistanceKmPipe],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [OcdataPipe, LoaderComponent, DetailsPanePipe, DistanceKmPipe]
})
export class SharedModule { }
