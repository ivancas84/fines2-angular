import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosTomaPosesionComponent } from '@component/cursos-toma-posesion/cursos-toma-posesion.component';
import { EnlaceNoDisponibleComponent } from '@component/enlace-no-disponible/enlace-no-disponible.component';
import { InfoCursosComponent } from '@component/info-cursos/info-cursos.component';
import { InscripcionDocenteCorrectaComponent } from '@component/inscripcion-docente-correcta/inscripcion-docente-correcta.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin.component';
import { HorarioAdminArrayComponent } from '@component/horario-admin-array/horario-admin-array.component';
import { ComisionArrayComponent } from '@component/comision-array/comision-array.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin.component';
import { SedeArrayComponent } from '@component/sede-array/sede-array.component';
import { AlumnoAdminComponent } from '@component/alumno-admin/alumno-admin.component';
import { AsignaturaArray2Component } from '@component/asignatura-array2/asignatura-array2.component';
import { GenerarConstanciaComponent } from '@component/generar-constancia/generar-constancia.component';
import { CalendarioArray2Component } from '@component/calendario-array2/calendario-array2.component';
import { CalendarioAdminComponent } from '@component/calendario-admin/calendario-admin.component';
import { CursoArrayComponent } from '@component/curso-array/curso-array.component';
import { AlumnoArrayComponent } from '@component/alumno-array/alumno-array.component';
import { InscripcionDocenteComponent } from '@component/inscripcion-docente/inscripcion-docente.component';
import { TomaPosesionEmailComponent } from '@component/toma-posesion-email/toma-posesion-email.component';

const routes: Routes = [
  { path: '', component: CursosTomaPosesionComponent, pathMatch: 'full' },

  { path: 'alumno-admin', component: AlumnoAdminComponent, pathMatch: 'full' },
  { path: 'alumno-array', component: AlumnoArrayComponent, pathMatch: 'full' },

  { path: 'asignatura-array', component: AsignaturaArray2Component, pathMatch: 'full' },
  { path: 'generar-constancia', component: GenerarConstanciaComponent, pathMatch: 'full' },
  { path: 'calendario-admin', component: CalendarioAdminComponent, pathMatch: 'full' },
  { path: 'calendario-array', component: CalendarioArray2Component, pathMatch: 'full' },

  { path: 'comision-admin', component: ComisionAdminComponent, pathMatch: 'full' },
  { path: 'comision-array', component: ComisionArrayComponent, pathMatch: 'full' },
  { path: 'curso-array', component: CursoArrayComponent, pathMatch: 'full' },

  { path: 'horario-admin-array', component: HorarioAdminArrayComponent, pathMatch: 'full' },

  { path: 'sede-admin', component: SedeAdminComponent, pathMatch: 'full' },
  { path: 'sede-array', component: SedeArrayComponent, pathMatch: 'full' },

  { path: 'inscripcion-docente', component: InscripcionDocenteComponent, pathMatch: 'full' },
  { path: 'inscripcion-docente-correcta', component: InscripcionDocenteCorrectaComponent, pathMatch: 'full' },
  { path: 'cursos-toma-posesion', component: CursosTomaPosesionComponent, pathMatch: 'full' },
  { path: 'toma-posesion-email', component: TomaPosesionEmailComponent, pathMatch: 'full' },

  { path: 'alumnos-para-docente', component: EnlaceNoDisponibleComponent, pathMatch: 'full' },
  { path: 'referentes-para-docente', component: EnlaceNoDisponibleComponent, pathMatch: 'full' },

  { path: 'info-cursos', component: InfoCursosComponent, pathMatch: 'full' },

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
