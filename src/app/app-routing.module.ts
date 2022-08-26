import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoAdminComponent } from '@component/alumno-admin/alumno-admin.component';
import { AsignaturaArrayComponent } from '@component/asignatura-array/asignatura-array.component';
import { CalendarioAdminArrayComponent } from '@component/calendario-admin-array/calendario-admin-array.component';
import { CalendarioAdminComponent } from '@component/calendario-admin/calendario-admin.component';
import { ComisionAdminArrayComponent } from '@component/comision-admin/comision-admin-array.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin.component';
import { CursosTomaPosesionComponent } from '@component/cursos-toma-posesion/cursos-toma-posesion.component';
import { EnlaceNoDisponibleComponent } from '@component/enlace-no-disponible/enlace-no-disponible.component';
import { GenerarConstanciaComponent } from '@component/generar-constancia/generar-constancia.component';
import { HomeComponent } from '@component/home/home.component';
import { InscripcionDocenteCorrectaComponent } from '@component/inscripcion-docente-correcta/inscripcion-docente-correcta.component';
import { InscripcionDocenteComponent } from '@component/inscripcion-docente/inscripcion-docente.component';
import { ResumenAlumnosComponent } from '@component/resumen-alumnos/resumen-alumnos.component';
import { ListaComisionesDocentesSinContralorComponent } from '@component/resumen-comisiones/lista-comisiones-docentes-sin-contralor';
import { ListaComisionesComponent } from '@component/resumen-comisiones/lista-comisiones.component';
import { ResumenComisionesComponent } from '@component/resumen-comisiones/resumen-comisiones.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin.component';
import { TomaPosesionEmailAbcComponent } from '@component/toma-posesion-email-abc/toma-posesion-email-abc.component';

const routes: Routes = [
  { path: '', component: CursosTomaPosesionComponent, pathMatch: 'full' },

  // { path: 'alumno-admin', component: AlumnoAdminComponent, pathMatch: 'full' },
  // { path: 'asignatura-array', component: AsignaturaArrayComponent, pathMatch: 'full' },
  // { path: 'curso-admin', component: CursoAdminComponent, pathMatch: 'full' },
  // { path: 'generar-constancia', component: GenerarConstanciaComponent, pathMatch: 'full' },
  // { path: 'resumen-comisiones', component: ResumenComisionesComponent, pathMatch: 'full' },
  // { path: 'lista-comisiones', component: ListaComisionesComponent, pathMatch: 'full' },
  // { path: 'resumen-alumnos', component: ResumenAlumnosComponent, pathMatch: 'full' },
  // { path: 'calendario-admin', component: CalendarioAdminComponent, pathMatch: 'full' },
  // { path: 'calendario-admin-array', component: CalendarioAdminArrayComponent, pathMatch: 'full' },
  // { path: 'comision-admin', component: ComisionAdminComponent, pathMatch: 'full' },
  // { path: 'comision-admin-array', component: ComisionAdminArrayComponent, pathMatch: 'full' },
  // { path: 'sede-admin', component: SedeAdminComponent, pathMatch: 'full' },
  // { path: 'lista-comisiones-docentes-sin-contralor', component: ListaComisionesDocentesSinContralorComponent, pathMatch: 'full' },

  { path: 'inscripcion-docente', component: InscripcionDocenteComponent, pathMatch: 'full' },
  { path: 'inscripcion-docente-correcta', component: InscripcionDocenteCorrectaComponent, pathMatch: 'full' },
  { path: 'cursos-toma-posesion', component: CursosTomaPosesionComponent, pathMatch: 'full' },
  { path: 'toma-posesion-email-abc', component: TomaPosesionEmailAbcComponent, pathMatch: 'full' },
  { path: 'alumnos-para-docente', component: EnlaceNoDisponibleComponent, pathMatch: 'full' },
  { path: 'referentes-para-docente', component: EnlaceNoDisponibleComponent, pathMatch: 'full' },

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
