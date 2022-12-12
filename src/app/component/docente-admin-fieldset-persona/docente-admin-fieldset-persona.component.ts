import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { onSubmit } from '@function/component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-docente-admin-fieldset-persona',
  templateUrl: './docente-admin-fieldset-persona.component.html',
  styleUrls: ['./docente-admin-fieldset-persona.component.css']
})
export class DocenteAdminFieldsetPersonaComponent implements OnInit {

  @Input() control!: FormGroup
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();
  onSubmit$:Subject<any> = new Subject();

  ngOnInit(): void {
    onSubmit(this.onSubmit$,this.control).subscribe((validationSuccessful) => this.onSubmit.emit("alumno"));
  }

}
