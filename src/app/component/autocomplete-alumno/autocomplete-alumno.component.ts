import { Component } from '@angular/core';
import { AbstractAutocompleteComponent } from '@component/abstract-autocomplete/abstract-autocomplete.component';

@Component({
  selector: 'app-autocomplete-alumno',
  templateUrl: '../../core/component/abstract-autocomplete/abstract-autocomplete.component.html',
  styleUrls: ['./autocomplete-alumno.component.css']
})
export class AutocompleteAlumnoComponent extends AbstractAutocompleteComponent {

  override entityName: string = "alumno";
  override title: string = "alumno"
}
