import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from '../core/data.service';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameResolver implements Resolve<Game[]> {

  constructor(private dataService: DataService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game[]> | Promise<Game[]> | Game[] {
    const gameId = route.paramMap.get('id');
    if (isNaN(+gameId)) {
      const message = `Game id is not a number: ${gameId}`;
      console.error(message);
      return;
    }
    return this.dataService.getGame(+gameId).pipe(
      catchError(err => {
        console.error(`Retrieval error: ${err}`);
        this.router.navigate([`/schedule`]);
        return of(null);
      })
    );
  }


}
