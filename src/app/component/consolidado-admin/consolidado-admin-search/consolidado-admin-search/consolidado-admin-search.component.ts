import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consolidado-admin-search',
  templateUrl: './consolidado-admin-search.component.html',
})
export class ConsolidadoAdminSearchComponent extends SearchComponent {

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
  ) {
    super(fb, router);
  }

}
