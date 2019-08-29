export class FbUser {
  name: string;
  uid: string;
  idp_id: string;
  roles: string[];
  photo: string;
  isAdmin: boolean;

  constructor(data: any) {

    console.log(' in FBUser, data: ', data);

    this.name = data.name;
    this.uid = data.uid;
    this.idp_id = data.idp_id;
    this.roles = data.roles;
    this.photo = data.photo;
    this.isAdmin = (this.roles && this.roles.length > 0 ? this.roles.filter( r => r === 'ADMIN').length > 0 : false);
    console.log('user is admin? ', this.isAdmin);
  }

}

