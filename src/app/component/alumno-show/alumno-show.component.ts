import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldConfig } from '@class/field-config';
import { FieldTreeElement } from '@class/field-tree-element';

@Component({
  selector: 'app-alumno-show',
  templateUrl: './alumno-show.component.html',
})
export class AlumnoShowComponent extends ShowComponent {

  readonly entityName: string = "alumno";

  fieldsConfig: FieldConfig[] = [
    {
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type:"si_no",
    },
    {
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type:"si_no",
    },
    {
      field:"creado",
      label:"Creado",
      type:"date",
      format:"dd/MM/yyyy HH:mm"
    },
    {
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type:"si_no",
    },
    {
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type:"si_no",
    },
    {
      field:"anio_ingreso",
      label:"Anio Ingreso",
    },
    {
      field:"activo",
      label:"Activo",
      type:"si_no",
    },
    {
      field:"observaciones",
      label:"Observaciones",
    },
    {
      field:"persona",
      label:"Persona",
      type:"label",
      entityName: "persona",
      //routerLink: "persona-detail",
      //queryParamField:"persona", 
    },
    {
      field:"comision",
      label:"Comision",
      type:"tree",
      tree:
        new FieldTreeElement({
          entityName:"comision",
          fieldNames:["division"],
          tree: [
            new FieldTreeElement({
              entityName:"planificacion",
              fkName:"planificacion",
              fieldNames:["anio","semestre"],
              join:""
            }),
            new FieldTreeElement({
              entityName:"sede",
              fkName:"sede",
              fieldNames:["numero"],
              prefix:"-"
            }),
          ]
        }),
      //entityName: "comision",
      //routerLink: "comision-detail",
      //queryParamField:"comision", 
    },
  ];  
}

