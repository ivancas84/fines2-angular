import { Component } from '@angular/core';
import { DetailComponent } from '@component/detail/detail.component';

@Component({
  selector: 'app-docente-detail',
  templateUrl: './docente-detail.component.html',
})
export class DocenteDetailComponent extends DetailComponent {
  readonly entityName: string = "docente";

}

