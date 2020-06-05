import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-asignatura-search',
  templateUrl: './asignatura-search.component.html',
})
export class AsignaturaSearchComponent extends SearchComponent {
  readonly entityName = 'asignatura';

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

}
