import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './modules/pages.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoginGuard], component: PagesComponent,
    loadChildren: () => import('./modules/pages.module').then(m => m.PagesModule)
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
