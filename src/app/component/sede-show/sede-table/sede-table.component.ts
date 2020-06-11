import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sede-table',
  templateUrl: './sede-table.component.html',
})
export class SedeTableComponent extends ShowElementComponent {

  constructor(protected router: Router) { 
    super(router);
  }
}
