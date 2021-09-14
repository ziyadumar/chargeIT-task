import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapViewComponent } from './map-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsPanePipe } from 'src/app/shared/pipes/details-pane.pipe';
import { DistanceKmPipe } from 'src/app/shared/pipes/distance-km.pipe';

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapViewComponent],
      imports: [HttpClientTestingModule],
      providers: [DetailsPanePipe, DistanceKmPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
