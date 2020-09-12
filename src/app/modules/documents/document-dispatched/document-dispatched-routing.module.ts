import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyTokenGuard } from '@core/guards/verify-token.guard';
import { DocumentDispatchedComponent } from './document-dispatched.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentDispatchedComponent,
    // canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Documentos de Entrega' },
    children: [
      {
        path: '', component: ListComponent
      },
      { path: 'new', component: DetailComponent },
      { path: ':id', component: DetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentDispatchedRoutingModule { }
