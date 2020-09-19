import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import urljoin from 'url-join';
import { User } from '../../shared/models/user.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';
import * as authActions from '../auth/auth.actions';
import { Subscription, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { SwalService } from '../services/swal.service';
import { SessionStorageService } from '../services/session-storage.service';

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
    private ssService: SessionStorageService,
    private lsService: LocalStorageService,
    private store: Store<AppState>
  ) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/auth');
    this.loadStorage();
    // this.url = urljoin(environment.apiUrl, '/users/login');
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
          this.ssService.set('token', this.token);
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

  login(user: User, remember: boolean ) {
    if (remember) {
      this.lsService.set('accountName', user.accountName);
    } else {
      this.lsService.remove('accountName');
    }
    return this.http
      .post(this.url, user)
      .pipe(
        map((response: any) => {
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
    this.ssService.remove('token');
    this.ssService.remove('user');
    // this.ssService.remove('menu');
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
  saveStorage(id: number, token: string, user: User, menu: any) {
    this.ssService.set('id', id);
    this.ssService.set('token', token);
    this.ssService.set('user', user);
    this.ssService.set('menu', menu);
    this.user = user;
    this.token = token;
  //  this.menu = menu;
  }
  loadStorage() {
    const token = this.ssService.get('token')
    if (token) {
      this.token = token;
      this.user = this.ssService.get('user');
      // this.menu = this.ssService.get('menu');
    } else {
      this.token = '';
      this.user = null;
//      this.menu = [];
    }
  }
}
