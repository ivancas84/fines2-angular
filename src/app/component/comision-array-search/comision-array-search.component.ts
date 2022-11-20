import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { chosenYearHandlerClose, setNullGroupKey } from '@function/component';
import { markAllAsTouched } from '@function/mark-all-as-touched';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { first, map, Observable } from 'rxjs';

@Component({
  selector: 'app-comision-array-search',
  templateUrl: './comision-array-search.component.html',
  styleUrls: ['./comision-array-search.component.css']
})
export class ComisionArraySearchComponent implements OnInit {

  chosenYearHandlerClose = chosenYearHandlerClose

  isSubmitted: boolean = false;
  @Input() display!: Display
 
  @ViewChild(MatExpansionPanel) searchPanel!: MatExpansionPanel;

  @Input() control!: FormGroup

  loadAutocompleteSede$!: Observable<any>; //inicializar
  searchControlSede: FormControl = new FormControl(null); //control para busqueda, no interfiere con el control del fieldset principal
  filteredOptionsSede$!: Observable<Array<{ [key: string]: any; }>>; //opciones de busqueda
  labelSede: string = ""; //label para mostrar si hay inicializado un valor

  constructor(
    protected componentTools: ComponentToolsService,
    protected dialog: MatDialog,
    protected router: Router,
    protected fb: FormBuilder,
  ) { }


  initAutocompleteSede(): void {
    this.filteredOptionsSede$ = this.componentTools.filteredOptionsAutocomplete({
      entityName:"sede",
      control:this.control.get("sede")!,
      searchControl:this.searchControlSede,
    })
 
    this.loadAutocompleteSede$ = this.componentTools.labelAutocomplete({
      entityName:"sede",
      control:this.control.get("sede")!,
      searchControl:this.searchControlSede,
    }).pipe(
         map(
           label => {
             this.labelSede = label;
             return true;
           }
         )
       )
  }


  ngOnInit(): void {
    this.initAutocompleteSede()
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
