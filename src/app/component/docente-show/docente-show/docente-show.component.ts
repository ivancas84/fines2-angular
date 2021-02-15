import { Component } from '@angular/core';
import { FieldDateOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldViewOptions } from '@class/field-view-options';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-docente-show',
  templateUrl: './docente-show.component.html',
})
export class DocenteShowComponent extends ShowComponent {

  readonly entityName: string = "docente";

  fieldsViewOptions: FieldViewOptions[] = [    
    {
      field:"apellidos",
      label:"Apellidos",
      aux: new RouterLinkOptions({path:"docente-detail", params:{id:"{{id}}"}})
    },
    {
      field:"nombres",
      label:"Nombres",
    },
    {
      field:"numero_documento",
      label:"Numero Documento",
    },
    {
      field:"fecha_nacimiento",
      label:"Fecha Nacimiento",
      type:new FieldDateOptions(),
    },
    {
      field:"telefono",
      label:"Telefono",
    },
    {
      field:"email",
      label:"Email",
    },
    {
      field:"email_abc",
      label:"Email Abc",
    },
   
  ];  
}

