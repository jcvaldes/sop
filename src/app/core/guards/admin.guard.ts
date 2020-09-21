import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService) {}
  canActivate() {
    let roles = this.authService.user.roles;
    if (containsAdminRole(roles) >= 0) {
      return true;
    } else {
      this.authService.logout();
      return false;
    }
  }
}
function containsAdminRole(roles) {
  return roles.findIndex(role => role.rolename === 'Administrador');
}
