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

@NgModule({
  declarations: [
    DocumentDispatchedComponent,
    DetailComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DocumentDispatchedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class DocumentDispatchedModule { }
