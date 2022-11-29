import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { onSubmit } from '@function/component';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alumno-admin-fieldset-persona',
  templateUrl: './alumno-admin-fieldset-persona.component.html',
  styleUrls: ['./alumno-admin-fieldset-persona.component.css']
})
export class AlumnoAdminFieldsetPersonaComponent implements OnInit{

  @Input() control!: FormGroup
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();
  onSubmit$:Subject<any> = new Subject();

  ngOnInit(): void {
    onSubmit(this.onSubmit$,this.control).subscribe((validationSuccessful) => this.onSubmit.emit("persona"));
  }

}
