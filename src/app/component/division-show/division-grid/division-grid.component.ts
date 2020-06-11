import { Component, OnInit } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division-grid',
  templateUrl: './division-grid.component.html',
})
export class DivisionGridComponent extends ShowElementComponent {
  constructor(protected router: Router) { 
    super(router);
  }
}
