import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-consolidado-search',
  templateUrl: './consolidado-search.component.html',
})
export class ConsolidadoSearchComponent extends SearchComponent {
  readonly entityName = 'curso';

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

}
