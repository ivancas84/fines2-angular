import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division-search',
  templateUrl: './division-search.component.html',
})
export class DivisionSearchComponent extends SearchComponent {
  public optCard: boolean = false;

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
  ) {
    super(fb, router);
  }

}
