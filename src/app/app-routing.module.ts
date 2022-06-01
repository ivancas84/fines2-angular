import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoAdminComponent } from '@component/alumno-admin/alumno-admin.component';
import { AsignaturaArrayComponent } from '@component/asignatura-array/asignatura-array.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin.component';
import { GenerarConstanciaComponent } from '@component/generar-constancia/generar-constancia.component';
import { HomeComponent } from '@component/home/home.component';
import { ResumenAlumnosComponent } from '@component/resumen-alumnos/resumen-alumnos.component';
import { ListaComisionesDocentesSinContralorComponent } from '@component/resumen-comisiones/lista-comisiones-docentes-sin-contralor';
import { ListaComisionesComponent } from '@component/resumen-comisiones/lista-comisiones.component';
import { ResumenComisionesComponent } from '@component/resumen-comisiones/resumen-comisiones.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'alumno-admin', component: AlumnoAdminComponent, pathMatch: 'full' },
  { path: 'asignatura-array', component: AsignaturaArrayComponent, pathMatch: 'full' },
  { path: 'curso-admin', component: CursoAdminComponent, pathMatch: 'full' },
  { path: 'generar-constancia', component: GenerarConstanciaComponent, pathMatch: 'full' },
  { path: 'resumen-comisiones', component: ResumenComisionesComponent, pathMatch: 'full' },
  { path: 'lista-comisiones', component: ListaComisionesComponent, pathMatch: 'full' },
  { path: 'resumen-alumnos', component: ResumenAlumnosComponent, pathMatch: 'full' },
  { path: 'lista-comisiones-docentes-sin-contralor', component: ListaComisionesDocentesSinContralorComponent, pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
