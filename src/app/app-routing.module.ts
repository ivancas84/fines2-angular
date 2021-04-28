import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@component/login/login.component';
import { LogoutComponent } from '@component/logout/logout.component';
import { HomeComponent } from '@component/home/home.component';
import { SocialLoginComponent } from '@component/social-login/social-login.component';

import { AlumnoShowComponent } from '@component/alumno-show/alumno-show.component';
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
import { DocenteShowComponent } from '@component/docente-show/docente-show/docente-show.component';
import { DocenteDetailComponent } from '@component/docente-detail/docente-detail/docente-detail.component';
import { TomaShowComponent } from '@component/toma-show/toma-show/toma-show.component';
import { TomaDetailComponent } from '@component/toma-detail/toma-detail.component';
import { AsignacionPlanillaDocenteAdminComponent } from '@component/asignacion-planilla-docente-admin/asignacion-planilla-docente-admin.component';
import { PlanillaDocenteAdminComponent } from '@component/planilla-docente-admin/planilla-docente-admin.component';
import { AuthGuardService } from '@service/auth/auth-guard.service';
import { CalendarioAdminArrayComponent } from '@component/calendario-admin-array/calendario-admin-array.component';
import { ComisionShow2Component } from '@component/comision-show2/comision-show2.component';
import { SedeShowComponent } from '@component/sede-show/sede-show.component';
import { SedeAdmin2Component } from '@component/sede-admin2/sede-admin2.component';
import { CentroEducativoAdminComponent } from '@component/centro-educativo-admin/centro-educativo-admin.component';
import { CentroEducativoShowComponent } from '@component/centro-educativo-show/centro-educativo-show.component';
import { CentroEducativoCantidadSedesComponent } from '@component/centro-educativo-cantidad-sedes/centro-educativo-cantidad-sedes.component';
import { ComisionAdmin2Component } from '@component/comision-admin2/comision-admin.component';
import { SedeShow2Component } from '@component/sede-show2/sede-show2.component';
import { SedeShow3Component } from '@component/sede-show3/sede-show3.component';
import { AsignaturaShowAdminComponent } from '@component/asignatura-show-admin/asignatura-show-admin.component';
import { PersonaShowAdminRelComponent } from '@component/persona-show-admin-rel/persona-show-admin-rel.component';
import { CalificacionShowAdminRelComponent } from '@component/calificacion-show-admin-rel/calificacion-show-admin-rel.component';
import { OptionsComponent } from '@component/options/options.component';
import { ComisionCensComponent } from '@component/comision-cens/comision-cens.component';
import { SedeCensComponent } from '@component/sede-cens/sede-cens.component';
import { ComisionRelacionadaAdminComponent } from '@component/comision-relacionada-admin/comision-relacionada-admin.component';
import { CursoTomaPosesionComponent } from '@component/curso-toma-posesion/curso-toma-posesion/curso-toma-posesion.component';
import { DesignacionShowComponent } from '@component/designacion-show/designacion-show.component';
import { DesignacionAdminComponent } from '@component/designacion-admin/designacion-admin.component';
import { ComisionShow3Component } from '@component/comision-show3/comision-show3.component';
import { AlumnosAprobadosShowComponent } from '@component/alumnos-aprobados-show/alumnos-aprobados-show.component';
import { TransferirAlumnoAdminComponent } from '@component/transferir-alumno-admin/transferir-alumno-admin.component';
import { AlumnoComisionAdminRelComponent } from '@component/alumno-comision-admin-rel/alumno-comision-admin-rel.component';
import { AlumnoAdminRelComponent } from '@component/alumno-admin-rel/alumno-admin-rel.component';
import { AlumnoComisionShowComponent } from '@component/alumno-comision-show/alumno-comision-show.component';
import { OptionsAdminComponent } from '@component/options-admin/options-admin.component';
import { TransferirAlumnoComisionAdminComponent } from '@component/transferir-alumno-comision-admin/transferir-alumno-comision-admin.component';
import { OptionsDirectionComponent } from '@component/options-direction/options-direction.component';
import { TomaShowOptionsComponent } from '@component/toma-show-options/toma-show-options.component';
import { ReferenteTomaShowComponent } from '@component/referente-toma-show/referente-toma-show.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'login-success', redirectTo: '' },
  { path: 'social-login', component: SocialLoginComponent, pathMatch: 'full' },
  { path: '',  component: HomeComponent, pathMatch: 'full' },

  { path: 'alumno-show', component: AlumnoShowComponent, pathMatch: 'full' },
  { path: 'asignacion-planilla-docente-admin', component: AsignacionPlanillaDocenteAdminComponent, pathMatch: 'full' },
  { path: 'comision-admin', component: ComisionAdminComponent, pathMatch: 'full' },
  { path: 'comision-show', component: ComisionShowComponent, pathMatch: 'full' },
  { path: 'comision-show2', component: ComisionShow2Component, pathMatch: 'full' },
  { path: 'comision-horarios-admin', component: ComisionHorariosAdminComponent, pathMatch: 'full' },
  { path: 'consolidado-docente', component: CdComisionShowComponent, pathMatch: 'full' },
  { path: 'consolidado-referente', component: CrComisionShowComponent, pathMatch: 'full' },
  { path: 'curso-admin', component: CursoAdminComponent, pathMatch: 'full' },
  { path: 'docente-detail', component: DocenteDetailComponent, pathMatch: 'full' },
  { path: 'docente-show', component: DocenteShowComponent, pathMatch: 'full', canActivate : [AuthGuardService]  },
  { path: 'horario-admin', component: HorarioAdminComponent, pathMatch: 'full' },
  { path: 'lista-alumnos', component: ListaAlumnosComponent, pathMatch: 'full' },
  { path: 'persona-admin', component: PersonaAdminComponent, pathMatch: 'full' },
  { path: 'persona-show', component: PersonaShowComponent, pathMatch: 'full' },
  { path: 'registro-docente', component: RdPersonaAdminComponent, pathMatch: 'full' },
  { path: 'registro-abc', component: RabcPersonaAdminComponent, pathMatch: 'full' },
  { path: 'sede-admin', component: SedeAdminComponent, pathMatch: 'full' },
  { path: 'toma-admin', component: TomaAdminComponent, pathMatch: 'full' },
  { path: 'toma-show', component: TomaShowComponent, pathMatch: 'full' },
  { path: 'toma-posesion', component: TomaPosesionAdminComponent, pathMatch: 'full' },
  { path: 'toma-posesion-realizada', component: TomaPosesionRealizadaComponent, pathMatch: 'full' },
  { path: 'toma-detail', component: TomaDetailComponent, pathMatch: 'full' },
  { path: 'planilla-docente-admin', component: PlanillaDocenteAdminComponent, pathMatch: 'full' },
  { path: 'calendario-admin-array', component: CalendarioAdminArrayComponent, pathMatch: 'full' },
  { path: 'alumno-comision-admin', component: AlumnoComisionAdminRelComponent, pathMatch: 'full' },
  { path: 'sede-show', component: SedeShowComponent, pathMatch: 'full' },
  { path: 'sede-admin-2', component: SedeAdmin2Component, pathMatch: 'full' },
  { path: 'centro-educativo-admin', component: CentroEducativoAdminComponent, pathMatch: 'full' },
  { path: 'centro-educativo-show', component: CentroEducativoShowComponent, pathMatch: 'full' },
  { path: 'centro-educativo-cantidad-sedes', component: CentroEducativoCantidadSedesComponent, pathMatch: 'full' },
  { path: 'comision-admin2', component: ComisionAdmin2Component, pathMatch: 'full' },
  { path: 'sede-show-2', component: SedeShow2Component, pathMatch: 'full' },
  { path: 'sede-show-3', component: SedeShow3Component, pathMatch: 'full' },
  { path: 'asignatura-show-admin', component: AsignaturaShowAdminComponent, pathMatch: 'full' },
  { path: 'persona-show-admin-rel', component: PersonaShowAdminRelComponent, pathMatch: 'full' },
  { path: 'calificacion-show-admin-rel', component: CalificacionShowAdminRelComponent, pathMatch: 'full' },
  { path: 'options', component: OptionsComponent, pathMatch: 'full' },
  { path: 'comision-cens', component: ComisionCensComponent, pathMatch: 'full' },
  { path: 'sede-cens', component: SedeCensComponent, pathMatch: 'full' },
  { path: 'curso-toma-posesion', component: CursoTomaPosesionComponent, pathMatch: 'full' },
  { path: 'comision-relacionada', component: ComisionRelacionadaAdminComponent, pathMatch: 'full' },
  { path: 'designacion-show', component: DesignacionShowComponent, pathMatch: 'full' },
  { path: 'designacion-admin', component: DesignacionAdminComponent, pathMatch: 'full' },
  { path: 'comision-show-3', component: ComisionShow3Component, pathMatch: 'full' },
  { path: 'alumnos-aprobados', component: AlumnosAprobadosShowComponent, pathMatch: 'full' },
  { path: 'transferir-alumno', component: TransferirAlumnoAdminComponent, pathMatch: 'full' },
  { path: 'alumno-admin-rel', component: AlumnoAdminRelComponent, pathMatch: 'full' },
  { path: 'alumno-comision-show', component: AlumnoComisionShowComponent, pathMatch: 'full' },
  { path: 'options-admin', component: OptionsAdminComponent, pathMatch: 'full' },
  { path: 'transferir-alumno-comision', component: TransferirAlumnoComisionAdminComponent, pathMatch: 'full' },
  { path: 'options-direction', component: OptionsDirectionComponent, pathMatch: 'full' },
  { path: 'options-admin', component: OptionsAdminComponent, pathMatch: 'full' },
  { path: 'toma-show-options', component: TomaShowOptionsComponent, pathMatch: 'full' },
  { path: 'referente-toma-show', component: ReferenteTomaShowComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
