import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-persona-search',
  templateUrl: './persona-search.component.html',
})
export class PersonaSearchComponent extends SearchComponent {

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
  ) {
    super(fb, router);
  }

}
