import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comision-search',
  templateUrl: './comision-search.component.html',
})
export class ComisionSearchComponent extends SearchComponent {
  readonly entityName = 'comision';

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
  ) {
    super(fb, router);
  }


}
