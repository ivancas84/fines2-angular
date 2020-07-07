import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsolidadoComponent } from '@component/consolidado/consolidado/consolidado.component';
import { SedeShowComponent } from './component/sede-show/sede-show/sede-show.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin/sede-admin.component';
import { TipoSedeAdminComponent } from '@component/tipo-sede-admin/tipo-sede-admin/tipo-sede-admin.component';
import { TipoSedeShowComponent } from '@component/tipo-sede-show/tipo-sede-show/tipo-sede-show.component';
import { CentroEducativoAdminComponent } from '@component/centro-educativo-admin/centro-educativo-admin/centro-educativo-admin.component';
import { CentroEducativoShowComponent } from '@component/centro-educativo-show/centro-educativo-show/centro-educativo-show.component';
import { PersonaAdminComponent } from '@component/persona-admin/persona-admin/persona-admin.component';
import { PersonaShowComponent } from '@component/persona-show/persona-show/persona-show.component';
import { CargoAdminComponent } from '@component/cargo-admin/cargo-admin/cargo-admin.component';
import { DesignacionAdminComponent } from '@component/designacion-admin/designacion-admin/designacion-admin.component';
import { PlanAdminComponent } from '@component/plan-admin/plan-admin/plan-admin.component';
import { PlanShowComponent } from '@component/plan-show/plan-show/plan-show.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin/comision-admin.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show/comision-show.component';
import { AsignaturaAdminComponent } from '@component/asignatura-admin/asignatura-admin/asignatura-admin.component';
import { AsignaturaShowComponent } from '@component/asignatura-show/asignatura-show/asignatura-show.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin/curso-admin.component';
import { ComisionDetailComponent } from '@component/comision-detail/comision-detail/comision-detail.component';
import { ModalidadAdminComponent } from '@component/modalidad-admin/modalidad-admin/modalidad-admin.component';
import { CursoShowComponent } from '@component/curso-show/curso-show/curso-show.component';
import { CrearComisionesComponent } from '@component/crear-comisiones/crear-comisiones.component';
import { HorarioAdminComponent } from '@component/horario-admin/horario-admin/horario-admin.component';
import { DivisionShowComponent } from '@component/division-show/division-show/division-show.component';
import { CrearHorariosComponent } from '@component/crear-horarios/crear-horarios.component';
import { TelefonoAdminComponent } from '@component/telefono-admin/telefono-admin/telefono-admin.component';
import { TomaAdminComponent } from '@component/toma-admin/toma-admin/toma-admin.component';
import { DetallePersonaAdminComponent } from '@component/detalle-persona-admin/detalle-persona-admin/detalle-persona-admin.component';
import { EmailAdminComponent } from '@component/email-admin/email-admin/email-admin.component';
import { ConsolidadoAdminComponent } from '@component/consolidado-admin/consolidado-admin/consolidado-admin.component';
import { CalendarioAdminComponent } from '@component/calendario-admin/calendario-admin/calendario-admin.component';

const routes: Routes = [
  { path: 'asignatura-show', component: AsignaturaShowComponent, pathMatch: 'full' },
  { path: 'asignatura-admin', component: AsignaturaAdminComponent, pathMatch: 'full' },
  { path: 'calendario-admin', component: CalendarioAdminComponent, pathMatch: 'full' },
  { path: 'cargo-admin', component: CargoAdminComponent, pathMatch: 'full' },
  { path: 'centro-educativo-admin', component: CentroEducativoAdminComponent, pathMatch: 'full' },
  { path: 'centro-educativo-show', component: CentroEducativoShowComponent, pathMatch: 'full' },
  { path: 'comision-admin', component: ComisionAdminComponent, pathMatch: 'full' },
  { path: 'comision-show', component: ComisionShowComponent, pathMatch: 'full' },
  { path: 'comision-detail', component: ComisionDetailComponent, pathMatch: 'full' },
  { path: 'consolidado', component: ConsolidadoComponent, pathMatch: 'full' },
  { path: 'consolidado-admin', component: ConsolidadoAdminComponent, pathMatch: 'full' },
  { path: 'crear-comisiones', component: CrearComisionesComponent, pathMatch: 'full' },
  { path: 'crear-horarios', component: CrearHorariosComponent, pathMatch: 'full' },
  { path: 'curso-admin', component: CursoAdminComponent, pathMatch: 'full' },
  { path: 'curso-show', component: CursoShowComponent, pathMatch: 'full' },
  { path: 'designacion-admin', component: DesignacionAdminComponent, pathMatch: 'full' },
  { path: 'detalle-persona-admin', component: DetallePersonaAdminComponent, pathMatch: 'full' },
  { path: 'email-admin', component: EmailAdminComponent, pathMatch: 'full' },
  { path: 'division-show', component: DivisionShowComponent, pathMatch: 'full' },
  { path: 'horario-admin', component: HorarioAdminComponent, pathMatch: 'full' },
  { path: 'modalidad-admin', component: ModalidadAdminComponent, pathMatch: 'full' },
  { path: 'persona-show', component: PersonaShowComponent, pathMatch: 'full' },
  { path: 'persona-admin', component: PersonaAdminComponent, pathMatch: 'full' },
  { path: 'plan-admin', component: PlanAdminComponent, pathMatch: 'full' },
  { path: 'plan-show', component: PlanShowComponent, pathMatch: 'full' },
  { path: 'sede-show', component: SedeShowComponent, pathMatch: 'full' },
  { path: 'sede-admin', component: SedeAdminComponent, pathMatch: 'full' },
  { path: 'telefono-admin', component: TelefonoAdminComponent, pathMatch: 'full' },
  { path: 'tipo-sede-show', component: TipoSedeShowComponent, pathMatch: 'full' },
  { path: 'tipo-sede-admin', component: TipoSedeAdminComponent, pathMatch: 'full' },
  { path: 'toma-admin', component: TomaAdminComponent, pathMatch: 'full' },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
