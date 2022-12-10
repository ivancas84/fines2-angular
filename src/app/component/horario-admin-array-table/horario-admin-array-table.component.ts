import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { naturalCompare } from '@function/natural-compare';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horario-admin-array-table',
  templateUrl: './horario-admin-array-table.component.html',
  styleUrls: ['./horario-admin-array-table.component.css'],
})
export class HorarioAdminArrayTableComponent implements AfterViewInit {

  constructor(
    protected dd: DataDefinitionToolService,
  ) { }


  @Input() control!: FormArray
  @Input() idComision!: string
  @Input() options: {[i:string]:{[i:string]:any}[]} = {}

  
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  displayedColumns = ["curso","dia","hora_inicio","hora_fin","options"]


  onChangeSort(sort: Sort): void {
    if (!sort.active || sort.direction === '') return;
    
    const data = this.control.value;
    
    data.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {  
      return (sort.direction === 'asc') ? naturalCompare(this.sortValue(sort.active,a),this.sortValue(sort.active, b)) : naturalCompare(this.sortValue(sort.active,b),this.sortValue(sort.active, a))
    });

    this.control.patchValue(data)
  }

  sortValue(fieldName:string, row:{[i:string]:any}): any{

    switch(fieldName){
      case "curso":
        for(var i = 0; i < this.options["curso"].length; i++){
          if(row[fieldName] == this.options["curso"][i]["id"]) return this.options["curso"][i]["asignatura-nombre"]
        }
      break;
      case "dia":
        for(var i = 0; i < this.options["dia"].length; i++){
          if(row[fieldName] == this.options["dia"][i]["id"]) return this.options["dia"][i]["label"]
        }
      break;
      default: return row[fieldName]
    }
  }

  remove(index: number){
    var fg = this.control.controls[index]
    if(!fg.get("id")!.value) this.control.removeAt(index)
    else fg.get("_mode")!.setValue("delete");
  }


  @Output() add: EventEmitter <void> = new EventEmitter <void>();


}
