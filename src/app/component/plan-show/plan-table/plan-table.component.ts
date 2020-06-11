import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
})
export class PlanTableComponent extends ShowElementComponent { 
  
  constructor(protected router: Router) { 
    super(router);
  }

}
