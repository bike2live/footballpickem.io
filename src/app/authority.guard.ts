import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./users/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorityGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
      if (this.authService.isLoggedIn()) {
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
