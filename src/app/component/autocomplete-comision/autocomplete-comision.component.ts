import { Component } from '@angular/core';
import { AbstractAutocompleteComponent } from '@component/abstract-autocomplete/abstract-autocomplete.component';

@Component({
  selector: 'app-autocomplete-comision',
  templateUrl: '../../core/component/abstract-autocomplete/abstract-autocomplete.component.html',
  styleUrls: ['./autocomplete-comision.component.css']
})
export class AutocompleteComisionComponent extends AbstractAutocompleteComponent {

  override entityName: string = "comision";

}
