import { NgModule } from '@angular/core';
import { DistributionStatusSearchComponent } from './components/distribution-status-search/distribution-status-search.component';
import { MaterialModule } from '../core/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DistributionStatusSearchComponent
  ],
  exports: [
    DistributionStatusSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
