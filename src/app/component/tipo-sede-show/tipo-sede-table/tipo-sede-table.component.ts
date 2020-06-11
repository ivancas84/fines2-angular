import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-sede-table',
  templateUrl: './tipo-sede-table.component.html',
})
export class TipoSedeTableComponent extends ShowElementComponent { 
  
  constructor(protected router: Router) { 
    super(router);
  }

}
