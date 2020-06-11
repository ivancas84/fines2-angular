import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centro-educativo-table',
  templateUrl: './centro-educativo-table.component.html',
})
export class CentroEducativoTableComponent extends ShowElementComponent {

  constructor(protected router: Router) { 
    super(router);
  }

}