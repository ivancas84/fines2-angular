import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consolidado-search',
  templateUrl: './consolidado-search.component.html',
})
export class ConsolidadoSearchComponent extends SearchComponent {
  
  constructor(
    protected fb: FormBuilder,
    protected router: Router,
  ) {
    super(fb, router);
  }

}
