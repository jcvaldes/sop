import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import urljoin from 'url-join';
import { User, UserReq } from '../../shared/models/user.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';
import * as authActions from '../auth/auth.actions';
import { Subscription, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Router } from '@angular/router';
import { LocalstorageService } from '@ls';
import { SwalService } from '../services/swal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  token: string;
  user: User;
  userSubcription: Subscription;
  url: string;
  constructor(
    public http: HttpClient,
    private router: Router,
    private swalService: SwalService,
    private ls: LocalstorageService,
    private store: Store<AppState>
  ) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/auth');
  }

  // nos avisa cualquier cambio con la autenticacion, cuando tengamos el usuario o cierro sesion
  initAuthListener() {
    // this.auth.authState.subscribe(fuser => {
    //   // console.log(fuser);
    //   if ( fuser ) {
    //     this.userSubcription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestoreUser: any) => {
    //       const user = Usuario.fromFirebase(firestoreUser);
    //       this.store.dispatch(authActions.setUser({user}));
    //     });
    //   } else {
    //     this.userSubcription.unsubscribe();
    //     this.store.dispatch(authActions.unSetUser());
    //   }
    // });
  }

  renewToken() {
    const url = urljoin(this.url, `/renewtoken?token=${this.token}`);
    return this.http
      .get(url)
      .pipe(
        map((response: any) => {
          this.token = response.token;
          this.ls.set('token', this.token);
          console.log('Token renovado');
          return true;
        })
      )
      .pipe(
        catchError(err => {
          this.logout();
          this.swalService.error(
            'Oopss...',
            'No fue posible renovar el token',
            'error'
          );
          return throwError(err);
        })
      );
  }

  login(user: UserReq, remember: boolean ) {
    debugger
    if (remember) {
      this.ls.set('username', user.username);
    } else {
      this.ls.remove('username');
    }
    return this.http
      .post(this.url, user)
      .pipe(
        map((response: any) => {
          debugger
          this.store.dispatch(ui.stopLoading());
          this.saveStorage(
            response.id,
            response.token,
            response.user,
            null // response.menu
          );
          this.store.dispatch(authActions.setUser(response.user));
        })
      )
      .pipe(
        catchError(err => {
          this.store.dispatch(ui.stopLoading());
          return throwError(err);
        })
      );
  }
  logout() {
    this.user = null;
    this.token = '';
    // this.menu = [];
    this.store.dispatch(authActions.unSetUser());
    this.ls.remove('token');
    this.ls.remove('user');
    // this.ls.remove('menu');
    this.router.navigate(['/login']);
  }
  isLoggedIn() {
    const isLogged = this.token.length > 5;
    if (!isLogged)  {
      return false;
    } else {
      return true;
    }
  }
  saveStorage(id: string, token: string, user: User, menu: any) {
    this.ls.set('id', id);
    this.ls.set('token', token);
    this.ls.set('user', user);
    this.ls.set('menu', menu);
    this.user = user;
    this.token = token;
  //  this.menu = menu;
  }
  loadStorage() {
    const token = this.ls.get('token');
    if (token) {
      this.token = token;
      this.user = this.ls.get('user');
      // this.menu = this.ls.get('menu');
    } else {
      this.token = '';
      this.user = null;
//      this.menu = [];
    }
  }
}
