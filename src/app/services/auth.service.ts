import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private db: AngularFireDatabase) {
    this.user = afAuth.authState;
  }

  get currentUserId(): string {
    console.log(`context in currentUserId`);
    return this.authState !== null ? this.authState.uid : '';
  }

  logout() {
    return this.afAuth.auth.signOut().then((resolve) => {
      const status = 'offline';
      this.setUserStatus(status);
      console.log(`userId is:`,this.currentUserId);
      this.router.navigate(['login']);
      console.log('navigated');
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
        this.authState = user.user;
      console.log(`user is:`,user);
      console.log(`UserID from db`,this.authState.uid);
      console.log(`userId is:`,this.currentUserId);
      const status = 'online';
        this.setUserStatus(status);
        this.router.navigateByUrl('/chat');
      });
  }

  authUser() {
    return this.user;
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user.user;
        console.log(`userId is:`,this.currentUserId);
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `user/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    const path = `user/${this.currentUserId}`;
    const data = {
      status: status
    };
     this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}


