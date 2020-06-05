import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';

@Component({
  selector: 'app-sede-search',
  templateUrl: './sede-search.component.html',
})
export class SedeSearchComponent extends SearchComponent {
  readonly entityName = 'sede';

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

}
