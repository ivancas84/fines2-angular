import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { emptyUrl } from '@function/empty-url.function';
import { logValidationErrors } from '@function/log-validation-errors';
import { markAllAsTouched } from '@function/mark-all-as-touched';
import { ComponentSearchService } from '@service/component/component-search-service';

@Component({
  selector: 'app-comision-array-search',
  templateUrl: './comision-array-search.component.html',
  styleUrls: ['./comision-array-search.component.css']
})
export class ComisionArraySearchComponent implements OnInit {

  isSubmitted: boolean = false;
  @Input() display!: Display
 
  @ViewChild(MatExpansionPanel) searchPanel!: MatExpansionPanel;

  control: FormGroup = this.fb.group({
    "calendario-anio":this.fb.control(""),
    "calendario-semestre":this.fb.control(""),
    "comision-autorizada":this.fb.control(""),
  });

  constructor(
    protected searchService: ComponentSearchService,
    protected dialog: MatDialog,
    protected router: Router,
    protected fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (!this.control.valid) {
      markAllAsTouched(this.control);
      logValidationErrors(this.control);
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "El formulario posee errores."}
      });
      this.isSubmitted = false;
    } else {
      this.display.setParams(this.control.value).setPage(1);
      this.searchPanel.close();
      this.router.navigateByUrl('/' + emptyUrl(this.router.url) + '?' + this.display.encodeURI());  
    }
  }
}
