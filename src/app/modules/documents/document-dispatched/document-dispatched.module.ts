import { SharedModule } from './../../../shared/shared.module';

import { DocumentDispatchedRoutingModule } from './document-dispatched-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/material.module';
import { DetailComponent } from './detail/detail.component';

import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentDispatchedComponent } from './document-dispatched.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PieceIdValidatorDirective } from '../../../shared/directives/piece-id.directive';

export let options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    DocumentDispatchedComponent,
    DetailComponent,
    ListComponent,
    PieceIdValidatorDirective
  ],
  imports: [
    CommonModule,
    DocumentDispatchedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ]
})
export class DocumentDispatchedModule { }
