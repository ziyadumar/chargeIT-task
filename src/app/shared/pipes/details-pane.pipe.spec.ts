import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { pipe } from 'rxjs';
import { TomtomService } from 'src/app/core/services/tomtom.service';
import { DetailsPanePipe } from './details-pane.pipe';
import { DistanceKmPipe } from './distance-km.pipe';

describe('DetailsPanePipe', () => {

  let service: TomtomService;
  let dis_pipe: DistanceKmPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DistanceKmPipe]
    });
    service = TestBed.inject(TomtomService);
    dis_pipe = TestBed.inject(DistanceKmPipe);
  });

  it('create an instance', () => {
    const pipe = new DetailsPanePipe(service, dis_pipe);
    expect(pipe).toBeTruthy();
  });
});
