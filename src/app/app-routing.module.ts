import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturaArrayComponent } from '@component/asignatura-array/asignatura-array.component';
import { HomeComponent } from '@component/home/home.component';
import { ResumenComisionesComponent } from '@component/resumen-comisiones/resumen-comisiones.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'asignatura-array', component: AsignaturaArrayComponent, pathMatch: 'full' },
  { path: 'resumen-comisiones', component: ResumenComisionesComponent, pathMatch: 'full' },



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
