import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { ComponentFormService } from '@service/component/component-form-service';
import { ComponentTableService } from '@service/component/component-table-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, first, Subscription } from 'rxjs';

@Component({
  selector: 'app-comision-admin-fieldset-curso',
  templateUrl: './comision-admin-fieldset-curso.component.html',
  styleUrls: ['./comision-admin-fieldset-curso.component.css']
})
export class ComisionAdminFieldsetCursoComponent implements AfterViewInit {

    constructor(
        protected ts: ComponentTableService,
        protected dd: DataDefinitionToolService,
        protected dialog: MatDialog,
        protected formService: ComponentFormService,
    ) { }

    @Input() control!: FormArray
    @Input() idComision?: string
    @Input() display$!:BehaviorSubject<Display> 

    @Output() addCurso: EventEmitter <void> = new EventEmitter <void>();


    protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
  
    @ViewChild(MatTable) table!: MatTable<any>;

    ngAfterViewInit(): void {
        var s = this.ts.renderRowsOnValueChanges(this.control, this.table)
        this.subscriptions.add(s)
    }

    ngOnDestroy () { this.subscriptions.unsubscribe() }

    displayedColumns = ["asignatura-nombre","horas_catedra","horario"]

    onChangeSort(sort: Sort): void {
        this.ts.onChangeSortLocal(sort, this.control)
    }
    
    @ViewChild("mainContent") content!: ElementRef;
    copyContent(): void {
        this.ts.copyContent(this.content, this.displayedColumns)
    }
 
    printContent(): void {
        this.ts.printContent(this.content, this.displayedColumns)
    }
  
    removeCurso(index: number) {
        var fg = this.control.controls[index]
        if(!fg.get("id")!.value) this.control.removeAt(index)
        else fg.get("_mode")!.setValue("delete");
    }
  
    onCreateCursos() {
        if(!this.idComision) {
            this.dialog.open(DialogAlertComponent, {
                data: {title: "Error", message: "No se pueden crear los cursos, no se encuentra el id definido."}
            });
            return
        }

        this.dd._post("persist", "crear_cursos_comision", this.idComision).pipe(first()).subscribe({
            next: (response: any) => {
              this.formService.submittedDisplay(response,this.display$)
            },
            error: (error: any) => { 
                this.dialog.open(DialogAlertComponent, {
                  data: {title: "Error", message: error.error}
                });
            }
        });
    }

    onDeleteCursos() {
        if(!this.idComision) {
            this.dialog.open(DialogAlertComponent, {
                data: {title: "Error", message: "No se pueden eliminar los cursos, no se encuentra el id definido."}
            });
            return
        }

        this.dd._post("persist", "eliminar_cursos_comision", this.idComision).pipe(first()).subscribe({
            next: (response: any) => {
              this.formService.submittedDisplay(response,this.display$)
            },
            error: (error: any) => { 
                this.dialog.open(DialogAlertComponent, {
                  data: {title: "Error", message: error.error}
                });
            }
        });
    }

    onDeleteHorarios() {
        if(!this.idComision) {
            this.dialog.open(DialogAlertComponent, {
                data: {title: "Error", message: "No se pueden eliminar los cursos, no se encuentra el id definido."}
            });
            return
        }

        this.dd._post("persist", "eliminar_horarios_comision", this.idComision).pipe(first()).subscribe({
            next: (response: any) => {
                this.formService.submittedDisplay(response,this.display$)
            },
            error: (error: any) => { 
                this.dialog.open(DialogAlertComponent, {
                  data: {title: "Error", message: error.error}
                });
          }
        });
    }

}
