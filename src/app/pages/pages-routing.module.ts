import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../guards/auth.guard';
import { RegisterGuard } from '../guards/register.guard';

import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [    
    {path: 'home', component: HomeComponent },
    {path: 'register', component: AuthComponent, canActivate:[RegisterGuard], canLoad: [RegisterGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], canLoad: [AuthGuard] },
    {path: '', redirectTo: 'home'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }