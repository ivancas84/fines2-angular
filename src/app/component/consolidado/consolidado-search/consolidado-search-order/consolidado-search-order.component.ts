import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchOrderComponent } from '@component/search-order/search-order.component';

@Component({
  selector: 'app-consolidado-search-order',
  templateUrl: './consolidado-search-order.component.html',
})
export class ConsolidadoSearchOrderComponent extends SearchOrderComponent {

  constructor ( protected fb: FormBuilder ) { super(fb); }


 


}
