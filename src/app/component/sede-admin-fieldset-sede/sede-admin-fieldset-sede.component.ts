import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Display } from '@class/display';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sede-admin-fieldset-sede',
  templateUrl: './sede-admin-fieldset-sede.component.html',
  styleUrls: ['./sede-admin-fieldset-sede.component.css']
})
export class SedeAdminFieldsetSedeComponent implements OnInit {

  @Input() control!: FormGroup //formulario

  optionsCentroEducativo$!: Observable<Array<any>>;

  constructor(
    protected dd: DataDefinitionToolService,
  ) { }
  
  ngOnInit(): void {
    this.optionsCentroEducativo$ = this.dd.post("label_all","centro_educativo", new Display)
  }

}