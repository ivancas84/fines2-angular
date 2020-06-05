import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-persona-search',
  templateUrl: './persona-search.component.html',
})
export class PersonaSearchComponent extends SearchComponent {
  readonly entityName = 'persona';

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

}
