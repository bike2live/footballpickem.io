export class User {
  name: string;
  uid: string;
  username: string;
  roles: string[];
  isAdmin: boolean;

  constructor(data: any) {

    this.name = data.name;
    this.uid = data.uid;
    this.username = data.username;
    this.roles = data.roles;
    this.isAdmin = (this.roles && this.roles.length > 0 ? this.roles.filter( r => r === 'ADMIN').length > 0 : false);
  }

}

