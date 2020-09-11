import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@app/app.reducer';
import * as ui from '@shared/ui.actions';

import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { SwalService } from '../../../core/services/swal.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  uiSubscription: Subscription;
  rememberme = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['jcvaldes', [Validators.required]],
      password: ['123456', Validators.required]
    });
    this.uiSubscription = this.store.select('ui')
                            .subscribe(ui => {
                              console.log('store subs');
                              this.isLoading = ui.isLoading;
                            });
  }
  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    const user: User = this.loginForm.value;
    this.authService.login(user, true)
      .subscribe(credenciales => {
        debugger
        this.router.navigate(['/']);
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }
}


