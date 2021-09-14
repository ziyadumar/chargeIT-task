import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenchargeService } from 'src/app/core/services/opencharge.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchPageComponent } from './search-page.component';
import { OcdataPipe } from 'src/app/shared/pipes/ocdata.pipe';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPageComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [OpenchargeService, OcdataPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
