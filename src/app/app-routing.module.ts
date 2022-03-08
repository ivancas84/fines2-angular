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
import { ComisionRelacionadaAdminArrayComponent } from '@component/comision-relacionada-show-admin/coomision-relacionada-show-admin.component';
import { AlumnoComisionRelacionShowComponent } from '@component/alumno-comision-relacion-show/alumno-comision-relacion-show.component';
import { DesignacionShowComponent } from '@component/designacion-show/designacion-show.component';
import { DesignacionRelacionShowComponent } from '@component/designacion-relacion-show/designacion-relacion-show.component';
import { AlumnosParaDocenteComponent } from '@component/_alumnos-para-docente/_alumnos-para-docente.component';
import { ReferentesParaDocenteComponent } from '@component/_referentes-para-docente/_referentes-para-docente.component';
import { DesignacionAdminArrayComponent } from '@component/designacion-admin-array/designacion-admin-array.component';
import { TomaShowComponent } from '@component/toma-show/toma-show.component';
import { AlumnoComisionAdminArrayComponent } from '@component/alumno-comision-admin-array/alumno-comision-admin-array.component';
import { CalificacionAdminArrayComponent } from '@component/calificacion-show-admin/calificacion-show-admin.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin.component';
import { CalendarioAdminArrayComponent } from '@component/calendario-admin-array/calendario-admin-array.component';
import { SedeShowComponent } from '@component/sede-show/sede-show.component';
import { DetallePersonaShowComponent } from '@component/detalle-persona-show/detalle-persona-show.component';
import { DetallePersonaAdminArrayComponent } from '@component/detalle-persona-show-admin/detalle-persona-show-admin.component';
import { CertificadoAlumnoRegularComponent } from '@component/_certificado_alumno_regular/_certificado_alumno_regular.component';
import { LegajoComponent } from '@component/_legajo/_legajo';
import { CalificacionesComponent } from '@component/_calificaciones/_calificaciones';
import { TransferirAlumnoComponent } from '@component/_transferir_alumno/transferir-alumno.component';
import { GenerarHorariosComision } from '@component/_generar_horarios_comision/generar_horarios_comision.component';
import { PersonaAdminComponent } from '@component/persona-admin/persona-admin.component';
import { TomaAdminArrayComponent } from '@component/toma-admin-array/toma-admin-array.component';
import { InscripcionAlumnoComponent } from '@component/_inscripcion-alumno/_inscripcion-alumno';
import { InscripcionAlumnoCorrectaComponent } from '@component/_inscripcion-alumno-correcta/_inscripcion-alumno-correcta.component';
import { CursosTomaPosesionComponent } from '@component/_cursos-toma-posesion/_cursos-toma-posesion.component';
import { TomaPosesionEmailAbcComponent } from '@component/_toma-posesion-email-abc/_toma-posesion-email-abc';
import { ModalidadAdminArrayComponent } from '@component/modalidad-admin-array/modalidad-admin-array.component';
import { HorarioAdminArrayComponent } from '@component/horario-admin-array/horario-admin-array.component';
import { InscripcionDocenteComponent } from '@component/_inscripcion-docente/_inscripcion-docente';
import { InscripcionDocenteCorrectaComponent } from '@component/_inscripcion-docente-correcta/_inscripcion-docente-correcta.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'login-success', redirectTo: '' },
  { path: 'social-login', component: SocialLoginComponent, pathMatch: 'full' },
  { path: '',  component: HomeComponent, pathMatch: 'full' },

  { path: 'comision-show',  component: ComisionShowComponent, pathMatch: 'full' },
  { path: 'comision-admin',  component: ComisionAdminComponent, pathMatch: 'full' },

  { path: 'alumno-comision-show',  component: AlumnoComisionShowComponent, pathMatch: 'full' },
  { path: 'alumno-comision-admin-array',  component: AlumnoComisionAdminArrayComponent, pathMatch: 'full' },
  { path: 'alumno-show',  component: AlumnoShowComponent, pathMatch: 'full' },
  { path: 'alumno-comision-relacion-show',  component: AlumnoComisionRelacionShowComponent, pathMatch: 'full' },
  { path: 'calendario-admin-array',  component: CalendarioAdminArrayComponent, pathMatch: 'full' },
  { path: 'calificacion-show',  component: CalificacionShowComponent, pathMatch: 'full' },
  { path: 'calificacion-show-admin',  component: CalificacionAdminArrayComponent, pathMatch: 'full' },
  { path: 'calificaciones',  component: CalificacionesComponent, pathMatch: 'full' },
  { path: 'comision-relacionada-show-admin',  component: ComisionRelacionadaAdminArrayComponent, pathMatch: 'full' },
  
  { path: 'designacion-show',  component: DesignacionShowComponent, pathMatch: 'full' },
  { path: 'designacion-relacion-show',  component: DesignacionRelacionShowComponent, pathMatch: 'full' },
  { path: 'detalle-persona-show',  component: DetallePersonaShowComponent, pathMatch: 'full' },
  { path: 'detalle-persona-show-admin',  component: DetallePersonaAdminArrayComponent, pathMatch: 'full' },
  { path: 'generar-horarios-comision',  component: GenerarHorariosComision, pathMatch: 'full' },
  { path: 'horario-admin-array',  component: HorarioAdminArrayComponent, pathMatch: 'full' },

  { path: 'inscripcion-alumno',  component: InscripcionAlumnoComponent, pathMatch: 'full' },
  { path: 'inscripcion-alumno-correcta',  component: InscripcionAlumnoCorrectaComponent, pathMatch: 'full' },

  { path: 'legajo',  component: LegajoComponent, pathMatch: 'full' },
  { path: 'alumnos-para-docente',  component: AlumnosParaDocenteComponent, pathMatch: 'full' },
  { path: 'referentes-para-docente',  component: ReferentesParaDocenteComponent, pathMatch: 'full' },
  { path: 'designacion-admin-array',  component: DesignacionAdminArrayComponent, pathMatch: 'full' },
  { path: 'sede-admin',  component: SedeAdminComponent, pathMatch: 'full' },
  { path: 'toma-show',  component: TomaShowComponent, pathMatch: 'full' },
  { path: 'toma-admin-array',  component: TomaAdminArrayComponent, pathMatch: 'full' },
  
  { path: 'sede-show',  component: SedeShowComponent, pathMatch: 'full' },
  { path: 'constancia',  component: CertificadoAlumnoRegularComponent, pathMatch: 'full' },
  
  { path: 'transferir-alumno',  component: TransferirAlumnoComponent, pathMatch: 'full' },
  { path: 'persona-admin',  component: PersonaAdminComponent, pathMatch: 'full' },
  { path: 'modalidad-admin-array',  component: ModalidadAdminArrayComponent, pathMatch: 'full' },
  { path: 'cursos-toma-posesion',  component: CursosTomaPosesionComponent, pathMatch: 'full' },
  { path: 'toma-posesion-email-abc',  component: TomaPosesionEmailAbcComponent, pathMatch: 'full' },
  { path: 'inscripcion-docente',  component: InscripcionDocenteComponent, pathMatch: 'full' },
  { path: 'inscripcion-docente-correcta',  component: InscripcionDocenteCorrectaComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
