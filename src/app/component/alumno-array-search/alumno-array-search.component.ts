import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { chosenYearHandlerClose, onSubmit } from '@function/component';
import { markAllAsTouched } from '@function/mark-all-as-touched';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alumno-array-search',
  templateUrl: './alumno-array-search.component.html',
  styleUrls: ['./alumno-array-search.component.css']
})
export class AlumnoArraySearchComponent implements OnInit {
   
  constructor(
        protected tools: ComponentToolsService,
        protected dialog: MatDialog
    ) { }
    
    @Input() control!: FormGroup
    @Input() display!: Display
    isSubmitted: boolean = false;
    @ViewChild(MatExpansionPanel) searchPanel!: MatExpansionPanel;
    onSubmit$:Subject<any> = new Subject();
    chosenYearHandlerClose = chosenYearHandlerClose
    ngOnInit(): void {
        onSubmit(this.onSubmit$,this.control).subscribe(
            (validationSuccessful) => this.submit()
        );
    }

    submit(): void {
        this.isSubmitted = true;
    
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
