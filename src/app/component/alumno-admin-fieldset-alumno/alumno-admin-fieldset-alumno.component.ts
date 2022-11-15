import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Display } from '@class/display';
import { onSubmit } from '@function/component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { filter, Observable, startWith, Subject, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-alumno-admin-fieldset-alumno',
  templateUrl: './alumno-admin-fieldset-alumno.component.html',
  styleUrls: ['./alumno-admin-fieldset-alumno.component.css']
})
export class AlumnoAdminFieldsetAlumnoComponent implements OnInit {
 
  @Input() control!: FormGroup
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();
  onSubmit$:Subject<any> = new Subject();

  constructor(
    protected dd: DataDefinitionService,
  ) { }

  optionsResolucion$!: Observable<Array<any>>;
  initOptionsResolucion(): void {
    this.optionsResolucion$ = this.dd.post("label_all","resolucion", new Display)
  }

  optionsPlan$!: Observable<Array<any>>;
  initOptionsPlan(): void {
    this.optionsPlan$ = this.dd.post("label_all","plan", new Display)
  }

  ngOnInit(): void {
    this.initOptionsResolucion()
    this.initOptionsPlan()
    onSubmit(this.onSubmit$,this.control,this.onSubmit,"alumno")
  }

}
