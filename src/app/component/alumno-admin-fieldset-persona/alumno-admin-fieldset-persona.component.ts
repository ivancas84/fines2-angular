import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';

@Component({
  selector: 'app-alumno-admin-fieldset-persona',
  templateUrl: './alumno-admin-fieldset-persona.component.html',
  styleUrls: ['./alumno-admin-fieldset-persona.component.css']
})
export class AlumnoAdminFieldsetPersonaComponent {

  @Input() control!: FormGroup
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();


}
