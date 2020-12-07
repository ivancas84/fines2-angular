import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-docente-show',
  templateUrl: './docente-show.component.html',
})
export class DocenteShowComponent extends ShowComponent {

  readonly entityName: string = "docente";

}

