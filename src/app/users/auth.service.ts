import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  isLoggedIn(): boolean {
    return !!this.currentUser && !!this.currentUser.uid;
  }

  setUser(user: User): void {
    this.currentUser = user;
  }

  getUser(): User {
    return this.currentUser;
  }
}
