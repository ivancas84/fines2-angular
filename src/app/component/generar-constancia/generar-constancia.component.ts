import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { PDF_URL } from '@config/app.config';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { BehaviorSubject, Subject, filter, startWith, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-generar-constancia',
  templateUrl: './generar-constancia.component.html',
  styleUrls: ['./generar-constancia.component.css']
})
export class GenerarConstanciaComponent {

  constructor(
    protected dd: DataDefinitionToolService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected validators: DdAsyncValidatorsService,
    protected tools: ComponentToolsService,
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  params: { [x: string]: any } = {} //parametros del componente
  isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar
  onSubmit$:Subject<any> = new Subject();

  control: FormGroup = this.fb.group({
    id:this.fb.control(null, {validators:Validators.required}),
    certificado:this.fb.control(null, {validators:Validators.required}),
    url:this.fb.control(null, {validators:Validators.required}),
    firma:this.fb.control(null),
    observaciones:this.fb.control(null),
  })




  protected onSubmit(){
    if(this.control.valid){

      var url = PDF_URL+this.control.get("certificado")!.value
      url += "?id="+this.control.get("id")!.value
      if(this.control.get("observaciones")!.value) url += "&observaciones="+this.control.get("observaciones")!.value
      if(this.control.get("url")!.value) url += "&url="+encodeURIComponent(this.control.get("url")!.value)
      if(this.control.get("firma")!.value) url += "&firma=true"
      else  url += "&firma=false"
      window.open(url, "_blank")
    }

  }


}
