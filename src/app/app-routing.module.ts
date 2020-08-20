import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AfiliacionAdminComponent } from '@component/afiliacion-admin/afiliacion-admin/afiliacion-admin.component';

const routes: Routes = [
  //{ path: 'afiliacion-admin', component: AfiliacionAdminComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
