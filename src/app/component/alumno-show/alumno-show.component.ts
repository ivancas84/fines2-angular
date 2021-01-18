import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldConfig } from '@class/field-config';
import { FieldTreeElement } from '@class/field-tree-element';
import { Validators } from '@angular/forms';
import { FieldControl } from '@class/field-control';
import { SearchDynamicOptions } from '@class/search-dynamic-options';

@Component({
  selector: 'app-alumno-show',
  templateUrl: './alumno-show.component.html',
})
export class AlumnoShowComponent extends ShowComponent {

  readonly entityName: string = "alumno";

  searchOptions: SearchDynamicOptions = new SearchDynamicOptions({searchParams:true})
 
  fieldsControlSp: FieldControl[] = [
    new FieldControl({
      field:"per-search",
      label:"Buscar",
      widthSm:"100%",
      widthGtSm:"100%",
    }),
  ];

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
      type:"label",
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
      entityName: "comision",
      //routerLink: "comision-detail",
      //queryParamField:"comision", 
    },
  ];  
}

