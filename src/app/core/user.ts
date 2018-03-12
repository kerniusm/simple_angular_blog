export interface Roles{
  guest: boolean;
  admin?: boolean;
}

export class User{
  uid?: string;
  email:string;
  displayName: string;
  photoURL: string;
  roles: Roles;

  constructor(authData){
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.roles = { guest: true }
  }
}
