import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-consolidado-admin-search',
  templateUrl: './consolidado-admin-search.component.html',
})
export class ConsolidadoAdminSearchComponent extends SearchComponent {
  readonly entityName = 'curso';

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

}
