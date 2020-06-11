import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';
    
@Component({
  selector: 'app-persona-grid',
  templateUrl: './persona-grid.component.html',
})
export class PersonaGridComponent extends ShowElementComponent { 
 
  constructor(protected router: Router) { 
    super(router);
  }

}
