import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFirestore, AngularFirestoreDocument }from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from './user';

import * as _ from 'lodash';

@Injectable()
export class AuthService {

  user$: Observable<User | null >;
  userRoles: any;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      this.user$ = this.afAuth.authState.
      switchMap((user) => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }else{
          return Observable.of(null);
        }

      });
    }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailSignUp(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return this.updateUserData(user);
      }
    ).catch((error) => this.handleError(error));
  }

  emailLogin(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      return this.updateUserData(user);
      }
    ).catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  isAdmin(user: User){
    const role = ['admin'];
    return this.checkAuthorization(user, role);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider){
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      return this.updateUserData(credential.user);
    }).catch((error) => this.handleError(error));
  }

  private handleError(error: Error){
    console.log(error);
  }

  private updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    console.log(userRef);
    const data: User ={
     uid: user.uid,
     email: user.email || null,
     displayName: user.displayName || 'guest',
     photoURL: user.photoURL || 'https://goo.gl/8kwFW5',
     roles: {
       guest: true
     }
    }
    return userRef.set(data,{ merge: true });
  }
}
