import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-sede-search',
  templateUrl: './sede-search.component.html',
})
export class SedeSearchComponent extends SearchComponent {

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
  ) {
    super(fb, router);
  }

}
