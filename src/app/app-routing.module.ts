import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@component/login/login.component';
import { LogoutComponent } from '@component/logout/logout.component';
import { HomeComponent } from '@component/home/home.component';
import { SocialLoginComponent } from '@component/social-login/social-login.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show.component';
import { AlumnoShowComponent } from '@component/alumno-show/alumno-show.component';
import { CalificacionShowComponent } from '@component/calificacion-show/calificacion-show.component';
import { AlumnoComisionShowComponent } from '@component/alumno-comision-show/alumno-comision-show.component';
import { ComisionRelacionadaShowAdminComponent } from '@component/comision-relacionada-show-admin/coomision-relacionada-show-admin.component';
import { AlumnoComisionRelacionShowComponent } from '@component/alumno-comision-relacion-show/alumno-comision-relacion-show.component';
import { DesignacionShowComponent } from '@component/designacion-show/designacion-show.component';
import { DesignacionRelacionShowComponent } from '@component/designacion-relacion-show/designacion-relacion-show.component';
import { AlumnosParaDocenteComponent } from '@component/_alumnos-para-docente/_alumnos-para-docente.component';
import { ReferentesParaDocenteComponent } from '@component/_referentes-para-docente/_referentes-para-docente.component';
import { DesignacionAdminShowComponent } from '@component/designacion-admin-show/designacion-admin-show.component';
import { TomaShowComponent } from '@component/toma-show/toma-show.component';
import { TomaShowAdminComponent } from '@component/toma-show-admin/toma-show-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'login-success', redirectTo: '' },
  { path: 'social-login', component: SocialLoginComponent, pathMatch: 'full' },
  { path: '',  component: HomeComponent, pathMatch: 'full' },

  { path: 'comision-show',  component: ComisionShowComponent, pathMatch: 'full' },
  { path: 'alumno-comision-show',  component: AlumnoComisionShowComponent, pathMatch: 'full' },
  { path: 'alumno-show',  component: AlumnoShowComponent, pathMatch: 'full' },
  { path: 'calificacion-show',  component: CalificacionShowComponent, pathMatch: 'full' },
  { path: 'comision-relacionada-show-admin',  component: ComisionRelacionadaShowAdminComponent, pathMatch: 'full' },
  { path: 'alumno-comision-relacion-show',  component: AlumnoComisionRelacionShowComponent, pathMatch: 'full' },
  { path: 'designacion-show',  component: DesignacionShowComponent, pathMatch: 'full' },
  { path: 'designacion-relacion-show',  component: DesignacionRelacionShowComponent, pathMatch: 'full' },
  { path: 'alumnos-para-docente',  component: AlumnosParaDocenteComponent, pathMatch: 'full' },
  { path: 'referentes-para-docente',  component: ReferentesParaDocenteComponent, pathMatch: 'full' },
  { path: 'designacion-admin-show',  component: DesignacionAdminShowComponent, pathMatch: 'full' },
  { path: 'toma-show',  component: TomaShowComponent, pathMatch: 'full' },
  { path: 'toma-show-admin',  component: TomaShowAdminComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
