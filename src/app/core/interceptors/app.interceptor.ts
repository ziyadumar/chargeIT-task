import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private loader: LoaderService,
    // p
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // for tomtom map service
    if (request.url.includes("api.tomtom.com")) {
      request = request.clone({ params: request.params.set('key', '1M3xBAJwZOhD74lHj93g5EaT4AwEg129') });
    }
    else
      // for open charge apis
      request = request.clone({
        params: request.params.set('output', 'json').set('camelcase', 'true')
          .set('distanceunit', 'KM').set('key', environment.openCharge.key)
          .set('maxresults', '100')
      });
    return next.handle(request).pipe(
      tap(
        (event: any) => {

          if (event.status === 200)
            this.loader.hide();
        },
        (err: any) => {
          this.loader.hide();
          // your custom error handling based on status codes :)
        }
      )
    );
  }
}
