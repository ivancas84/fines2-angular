import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaShowComponent } from '@component/persona-show/persona-show/persona-show.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show/comision-show.component';
import { RdPersonaAdminComponent } from '@component/registro-docente/persona-admin/persona-admin.component';

const routes: Routes = [
  { path: 'persona-show', component: PersonaShowComponent, pathMatch: 'full' },
  { path: 'comision-show', component: ComisionShowComponent, pathMatch: 'full' },
  { path: 'registro-docente', component: RdPersonaAdminComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
