import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura-table',
  templateUrl: './asignatura-table.component.html',
})
export class AsignaturaTableComponent extends ShowElementComponent {

  constructor(protected router: Router) { 
    super(router);
  }

}