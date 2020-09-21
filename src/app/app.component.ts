import { Component } from '@angular/core';
import { NavigationStart, RouterEvent, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sop';
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((e : RouterEvent) => {
       this.navigationInterceptor(e);
     });
  }
  navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {

    }
    if (event instanceof NavigationEnd) {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {}
    if (event instanceof NavigationError) {}
  }
}
