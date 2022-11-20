import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { chosenYearHandlerClose } from '@function/component';
import { markAllAsTouched } from '@function/mark-all-as-touched';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-sede-array-search',
  templateUrl: './sede-array-search.component.html',
  styleUrls: ['./sede-array-search.component.css']
})
export class SedeArraySearchComponent {
  
    constructor(
      protected tools: ComponentToolsService,
      protected dialog: MatDialog
    ) { }

    @Input() control!: FormGroup
    @Input() display!: Display
    
    chosenYearHandlerClose = chosenYearHandlerClose

    isSubmitted: boolean = false;
 
    @ViewChild(MatExpansionPanel) searchPanel!: MatExpansionPanel;


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
        this.tools.searchAndNavigateByUrl(this.control.value, this.display, this.searchPanel)
      }
    }
  
  
}
