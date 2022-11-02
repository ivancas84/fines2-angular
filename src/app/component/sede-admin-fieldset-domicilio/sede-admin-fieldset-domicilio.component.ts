import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-sede-admin-fieldset-domicilio',
  templateUrl: './sede-admin-fieldset-domicilio.component.html',
  styleUrls: ['./sede-admin-fieldset-domicilio.component.css']
})
export class SedeAdminFieldsetDomicilioComponent implements OnInit {

  @Input() control!: FormGroup //formulario
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();

  constructor(
    protected fb: FormBuilder, 
  ) { }


  ngOnInit(): void {
    this.switchDomicilio.setValue(this.control.get("id")!.value != null)
    
    this.switchDomicilio$ = this.switchDomicilio.valueChanges.pipe(
      startWith(this.switchDomicilio.value),
      map(
          value => {
              if(value) {
                this.control.enable()
                this.control.get("id")?.setValue(this.control.get("id")?.value)
              }
              else {
                this.control.disable()
                this.control.get("id")?.setValue(null)
              }
              return true;
          }
      )
  )
    
  }

  switchDomicilio: FormControl = this.fb.control(true)
  switchDomicilio$!: Observable<any>;

    
}
