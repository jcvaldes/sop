import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyTokenGuard } from '../core/guards/verify-token.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [VerifyTokenGuard],
    data: { titulo: 'Dashboard' }
  },
  {
    path: 'documentos-entrega',
    loadChildren: () => import('./documents/document-dispatched/document-dispatched.module').then(m => m.DocumentDispatchedModule),
    // canActivate: [LoginGuard],
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
