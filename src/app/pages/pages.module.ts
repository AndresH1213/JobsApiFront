import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { PagesRoutingModule } from './pages-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalJobsComponent } from './components/modal-jobs/modal-jobs.component';


@NgModule({
  declarations: [
    AuthComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    ModalJobsComponent,
  ],  
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    ButtonModule
  ]
})
export class PagesModule { }
