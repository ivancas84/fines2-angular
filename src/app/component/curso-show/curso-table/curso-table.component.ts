import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-table',
  templateUrl: './curso-table.component.html',
})
export class CursoTableComponent extends ShowElementComponent { 
  
  constructor(protected router: Router) { 
    super(router);
  }

}
