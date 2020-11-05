import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@component/login/login.component';
import { LogoutComponent } from '@component/logout/logout.component';

import { PersonaShowComponent } from '@component/persona-show/persona-show/persona-show.component';
import { ComisionHorariosAdminComponent } from '@component/comision-horarios-admin/comision-horarios-admin/comision-horarios-admin.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show/comision-show.component';
import { RdPersonaAdminComponent } from '@component/registro-docente/persona-admin/persona-admin.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin/comision-admin.component';
import { HorarioAdminComponent } from '@component/horario-admin/horario-admin/horario-admin.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin/sede-admin.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin/curso-admin.component';
import { TomaAdminComponent } from '@component/toma-admin/toma-admin/toma-admin.component';
import { CdComisionShowComponent } from '@component/consolidado-docente/consolidado-docente/comision-show.component';
import { TomaPosesionAdminComponent } from '@component/toma-posesion/toma-posesion-admin/toma-posesion-admin.component';
import { RabcPersonaAdminComponent } from '@component/registro-abc/persona-admin/persona-admin.component';
import { TomaPosesionRealizadaComponent } from '@component/toma-posesion-realizada/toma-posesion-realizada.component';
import { ListaAlumnosComponent } from '@component/lista-alumnos/lista-alumnos.component';
import { CrComisionShowComponent } from '@component/consolidado-referente/comision-show/comision-show.component';
import { PersonaAdminComponent } from '@component/persona-admin/persona-admin/persona-admin.component';
import { HomeComponent } from '@component/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'login-success', redirectTo: '' },
  { path: '',  component: HomeComponent, pathMatch: 'full' },

  { path: 'comision-admin', component: ComisionAdminComponent, pathMatch: 'full' },
  { path: 'comision-show', component: ComisionShowComponent, pathMatch: 'full' },
  { path: 'comision-horarios-admin', component: ComisionHorariosAdminComponent, pathMatch: 'full' },
  { path: 'consolidado-docente', component: CdComisionShowComponent, pathMatch: 'full' },
  { path: 'consolidado-referente', component: CrComisionShowComponent, pathMatch: 'full' },
  { path: 'curso-admin', component: CursoAdminComponent, pathMatch: 'full' },
  { path: 'horario-admin', component: HorarioAdminComponent, pathMatch: 'full' },
  { path: 'lista-alumnos', component: ListaAlumnosComponent, pathMatch: 'full' },
  { path: 'persona-admin', component: PersonaAdminComponent, pathMatch: 'full' },
  { path: 'persona-show', component: PersonaShowComponent, pathMatch: 'full' },
  { path: 'registro-docente', component: RdPersonaAdminComponent, pathMatch: 'full' },
  { path: 'registro-abc', component: RabcPersonaAdminComponent, pathMatch: 'full' },
  { path: 'sede-admin', component: SedeAdminComponent, pathMatch: 'full' },
  { path: 'toma-admin', component: TomaAdminComponent, pathMatch: 'full' },
  { path: 'toma-posesion', component: TomaPosesionAdminComponent, pathMatch: 'full' },
  { path: 'toma-posesion-realizada', component: TomaPosesionRealizadaComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
