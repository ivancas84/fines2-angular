import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-persona-show',
  templateUrl: './persona-show.component.html',
})
export class PersonaShowComponent extends ShowComponent {

  readonly entityName: string = "persona";

}

