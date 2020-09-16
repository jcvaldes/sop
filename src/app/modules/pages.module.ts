import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '@core/navbar/navbar.component';
import { MaterialModule } from '@core/material.module';
import { MenuComponent } from '@app/modules/menu/menu.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    NavbarComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
