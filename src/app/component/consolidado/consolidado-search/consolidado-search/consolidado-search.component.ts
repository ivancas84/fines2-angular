import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchComponent } from '@component/search/search.component';
import { Router } from '@angular/router';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consolidado-search',
  templateUrl: './consolidado-search.component.html',
})
export class ConsolidadoSearchComponent extends SearchComponent {
  
  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected toast: ToastService, 
    protected modalService: NgbModal
  ) {
    super(fb, router, toast, modalService);
  }

}
