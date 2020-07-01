import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchComponent } from '@component/search/search.component';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sede-search',
  templateUrl: './sede-search.component.html',
})
export class SedeSearchComponent extends SearchComponent {

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected toast: ToastService, 
    protected modalService: NgbModal
  ) {
    super(fb, router, toast, modalService);
  }

}
