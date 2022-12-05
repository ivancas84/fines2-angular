import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoAdminComponent } from '@component/_curso-admin/curso-admin.component';
import { CursosTomaPosesionComponent } from '@component/cursos-toma-posesion/cursos-toma-posesion.component';
import { EnlaceNoDisponibleComponent } from '@component/enlace-no-disponible/enlace-no-disponible.component';
import { HomeComponent } from '@component/home/home.component';
import { InfoCursosComponent } from '@component/info-cursos/info-cursos.component';
import { InscripcionDocenteCorrectaComponent } from '@component/inscripcion-docente-correcta/inscripcion-docente-correcta.component';
import { InscripcionDocenteComponent } from '@component/_inscripcion-docente/inscripcion-docente.component';
import { ResumenAlumnosComponent } from '@component/_resumen-alumnos/resumen-alumnos.component';
import { ListaComisionesDocentesSinContralorComponent } from '@component/_resumen-comisiones/lista-comisiones-docentes-sin-contralor';
import { ListaComisionesComponent } from '@component/_resumen-comisiones/lista-comisiones.component';
import { ResumenComisionesComponent } from '@component/_resumen-comisiones/resumen-comisiones.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin.component';
import { TomaPosesionEmailAbcComponent } from '@component/_toma-posesion-email-abc/toma-posesion-email-abc.component';
import { HorarioAdminArrayComponent } from '@component/horario-admin-array/horario-admin-array.component';
import { ComisionArrayComponent } from '@component/comision-array/comision-array.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin.component';
import { SedeArrayComponent } from '@component/sede-array/sede-array.component';
import { AlumnoAdmin2Component } from '@component/alumno-admin2/alumno-admin2.component';
import { AsignaturaArray2Component } from '@component/asignatura-array2/asignatura-array2.component';
import { GenerarConstanciaComponent } from '@component/generar-constancia/generar-constancia.component';
import { CalendarioArray2Component } from '@component/calendario-array2/calendario-array2.component';
import { CalendarioAdminComponent } from '@component/calendario-admin/calendario-admin.component';
import { CursoArrayComponent } from '@component/curso-array/curso-array.component';
import { AlumnoArrayComponent } from '@component/alumno-array/alumno-array.component';

const routes: Routes = [
  { path: '', component: CursosTomaPosesionComponent, pathMatch: 'full' },

  { path: 'alumno-admin2', component: AlumnoAdmin2Component, pathMatch: 'full' },
  { path: 'alumno-array', component: AlumnoArrayComponent, pathMatch: 'full' },

  { path: 'asignatura-array', component: AsignaturaArray2Component, pathMatch: 'full' },
  { path: 'curso-admin', component: CursoAdminComponent, pathMatch: 'full' },
  { path: 'generar-constancia', component: GenerarConstanciaComponent, pathMatch: 'full' },
  { path: 'resumen-comisiones', component: ResumenComisionesComponent, pathMatch: 'full' },
  { path: 'lista-comisiones', component: ListaComisionesComponent, pathMatch: 'full' },
  { path: 'resumen-alumnos', component: ResumenAlumnosComponent, pathMatch: 'full' },
  { path: 'calendario-admin', component: CalendarioAdminComponent, pathMatch: 'full' },
  { path: 'calendario-array', component: CalendarioArray2Component, pathMatch: 'full' },

  { path: 'comision-admin', component: ComisionAdminComponent, pathMatch: 'full' },
  { path: 'comision-array', component: ComisionArrayComponent, pathMatch: 'full' },
  { path: 'curso-array', component: CursoArrayComponent, pathMatch: 'full' },

  { path: 'horario-admin-array', component: HorarioAdminArrayComponent, pathMatch: 'full' },

  { path: 'sede-admin', component: SedeAdminComponent, pathMatch: 'full' },
  { path: 'sede-array', component: SedeArrayComponent, pathMatch: 'full' },

  { path: 'lista-comisiones-docentes-sin-contralor', component: ListaComisionesDocentesSinContralorComponent, pathMatch: 'full' },
  
  { path: 'inscripcion-docente', component: InscripcionDocenteComponent, pathMatch: 'full' },
  { path: 'inscripcion-docente-correcta', component: InscripcionDocenteCorrectaComponent, pathMatch: 'full' },
  { path: 'cursos-toma-posesion', component: CursosTomaPosesionComponent, pathMatch: 'full' },

  { path: 'toma-posesion-email-abc', component: TomaPosesionEmailAbcComponent, pathMatch: 'full' },
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
