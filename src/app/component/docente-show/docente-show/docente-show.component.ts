import { Component } from '@angular/core';
import { FieldView } from '@class/field-view';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-docente-show',
  templateUrl: './docente-show.component.html',
})
export class DocenteShowComponent extends ShowComponent {

  readonly entityName: string = "docente";

  infoColumns: FieldView[] = [    
    {
      field:"apellidos",
      label:"Apellidos",
      routerLink:"docente-detail",
      queryParamField:"id"
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
      type:"date",
      format:"dd/MM/yyyy"
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

