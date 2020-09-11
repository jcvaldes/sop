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
  // {
  //   path: 'documents-entrega',
  //   loadChildren: () => import('./documentos/documento-entrega/documento-entrega.module').then(m => m.DocumentoEntregaModule),
  //   // canActivate: [LoginGuard],
  // },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
