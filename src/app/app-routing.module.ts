import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { path: 'comision-admin', component: ComisionAdminComponent, pathMatch: 'full' },
  { path: 'comision-show', component: ComisionShowComponent, pathMatch: 'full' },
  { path: 'curso-admin', component: CursoAdminComponent, pathMatch: 'full' },
  { path: 'persona-show', component: PersonaShowComponent, pathMatch: 'full' },
  { path: 'registro-docente', component: RdPersonaAdminComponent, pathMatch: 'full' },
  { path: 'comision-horarios-admin', component: ComisionHorariosAdminComponent, pathMatch: 'full' },
  { path: 'horario-admin', component: HorarioAdminComponent, pathMatch: 'full' },
  { path: 'sede-admin', component: SedeAdminComponent, pathMatch: 'full' },
  { path: 'toma-admin', component: TomaAdminComponent, pathMatch: 'full' },
  { path: 'consolidado-docente', component: CdComisionShowComponent, pathMatch: 'full' },
  { path: 'toma-posesion', component: TomaPosesionAdminComponent, pathMatch: 'full' },
  { path: 'registro-abc', component: RabcPersonaAdminComponent, pathMatch: 'full' },
  { path: 'toma-posesion-realizada', component: TomaPosesionRealizadaComponent, pathMatch: 'full' },
  { path: 'lista-alumnos', component: ListaAlumnosComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
