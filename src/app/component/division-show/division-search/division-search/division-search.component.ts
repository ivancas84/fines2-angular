import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-division-search',
  templateUrl: './division-search.component.html',
})
export class DivisionSearchComponent extends SearchComponent {
  readonly entityName = 'comision';

  public optCard: boolean = false;

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

}
