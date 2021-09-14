import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  loading = false;
  private subscription: Subscription;

  constructor(
    private loadingService: LoaderService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.subscription = this.loadingService.loaderState
      .subscribe((state: LoaderState) => {
        this.loading = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
