import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { datePickerYearGroupKey, setNullGroupKey } from '@function/component';
import { markAllAsTouched } from '@function/mark-all-as-touched';
import { ComponentSearchService } from '@service/component/component-search-service';
import { first } from 'rxjs';

@Component({
  selector: 'app-comision-array-search',
  templateUrl: './comision-array-search.component.html',
  styleUrls: ['./comision-array-search.component.css']
})
export class ComisionArraySearchComponent implements OnInit {

  datePickerYearGroupKey = datePickerYearGroupKey

  isSubmitted: boolean = false;
  @Input() display!: Display
 
  @ViewChild(MatExpansionPanel) searchPanel!: MatExpansionPanel;

  @Input() control!: FormGroup

  constructor(
    protected componentTools: ComponentSearchService,
    protected dialog: MatDialog,
    protected router: Router,
    protected fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.isSubmitted = true;
 
    if (this.control.pending) {
      this.control.statusChanges.pipe(first()).subscribe(() => {
        if (this.control.valid) this.submit()
      });
    } else this.submit();
  }

  submit(): void {
    if (!this.control.valid) {
      markAllAsTouched(this.control);
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "El formulario posee errores."}
      });
      this.isSubmitted = false;
    } else {
      this.componentTools.searchAndNavigateByUrl(this.control.value, this.display, this.searchPanel)
    }
  }
}
