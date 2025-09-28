import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CrearComponent } from './modules/prestamo/components/crear/crear.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'prestamo/crear', component: CrearComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
