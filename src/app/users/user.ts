export class User {
  name: string;
  uid: string;
  username: string;
  roles: string[];
  isAdmin: boolean;

  /**
   * setAdmin
   */
  public setAdmin(): boolean {
    if (!this.isAdmin) {
      this.isAdmin = (this.roles && this.roles.length > 0 ? this.roles.filter( r => r === 'ADMIN').length > 0 : false);
    }

    return this.isAdmin;
  }

}

