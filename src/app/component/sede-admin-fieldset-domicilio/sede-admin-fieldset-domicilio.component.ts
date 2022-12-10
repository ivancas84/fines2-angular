import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-sede-admin-fieldset-domicilio',
  templateUrl: './sede-admin-fieldset-domicilio.component.html',
  styleUrls: ['./sede-admin-fieldset-domicilio.component.css']
})
export class SedeAdminFieldsetDomicilioComponent implements OnInit {

  @Input() control!: FormGroup //formulario

  constructor(
    protected fb: FormBuilder, 
  ) { }


  switchDomicilio: FormControl = this.fb.control(true)
  switchDomicilio$!: Observable<any>;
  control$!: Observable<any>;
  lastId!: string;

  ngOnInit(): void {
    this.switchDomicilio.setValue(this.control.get("id")!.value != null)

    this.control$ = this.control.get("id")!.valueChanges.pipe(
      startWith(this.control.get("id")!.value),
      map(
        id => {
          if(id != this.lastId) {
            this.lastId = id
            this.switchDomicilio.setValue(id != null)
          }
          return true;
        }
      )
    )

    
    this.switchDomicilio$ = this.switchDomicilio.valueChanges.pipe(
      startWith(this.switchDomicilio.value),
      map(
          value => {
              if(value) this.control.enable()
              else this.control.disable()
              return true;
          }
      )
  )
    
  }


    
}
