import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpCacheService } from './http-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // pass along non-cacheable requests and invalidate cache
    if (req.method !== 'GET') {
      console.log(`Invalidating cache: ${req.method} ${req.body} ${req.url}`, req.body);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }
    // attempt to retrieve a chaced response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    // return cached response
    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    // send request to server and add response to cache
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Adding item to cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      )

  }

}
