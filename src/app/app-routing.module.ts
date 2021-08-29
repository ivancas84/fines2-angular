import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@component/login/login.component';
import { LogoutComponent } from '@component/logout/logout.component';
import { HomeComponent } from '@component/home/home.component';
import { SocialLoginComponent } from '@component/social-login/social-login.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'login-success', redirectTo: '' },
  { path: 'social-login', component: SocialLoginComponent, pathMatch: 'full' },
  { path: '',  component: HomeComponent, pathMatch: 'full' },

  { path: 'comision-show',  component: ComisionShowComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
