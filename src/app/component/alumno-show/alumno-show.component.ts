import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldConfig } from '@class/field-config';
import { FieldControl } from '@class/field-control';

@Component({
  selector: 'app-alumno-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class AlumnoShowComponent extends ShowComponent {

  readonly entityName: string = "alumno";

  fieldsConfig: FieldConfig[] = [
    new FieldConfig({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type:"si_no",
    }),
    new FieldConfig({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type:"si_no",
    }),
    new FieldConfig({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type:"si_no",
    }),
    new FieldConfig({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type:"si_no",
    }),
    new FieldConfig({
      field:"anio_ingreso",
      label:"Anio Ingreso",
    }),
    new FieldConfig({
      field:"activo",
      label:"Activo",
      type:"si_no",
    }),
    new FieldConfig({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldConfig({
      field:"persona",
      label:"Persona",
      type:"label",
      entityName: "persona",
      //routerLink: "persona-detail",
      //queryParamField:"persona", 
    }),
    new FieldConfig({
      field:"comision",
      label:"Comision",
      type:"label",
      entityName: "comision",
      //routerLink: "comision-detail",
      //queryParamField:"comision", 
    }),
  ];  
  fieldsControlSp: FieldControl[] = [
    new FieldControl({
      field:"per-search",
      label:"Buscar",
      widthSm: "100%",
      widthGtSm: "100%",
    }),

    new FieldControl({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type: "select_checkbox",
    }),

    new FieldControl({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type: "select_checkbox",
    }),

    new FieldControl({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type: "select_checkbox",
    }),

    new FieldControl({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type: "select_checkbox",
    }),

    new FieldControl({
      field:"anio_ingreso",
      label:"Anio Ingreso",
      type: "select_param",
      options: ['1','2','3'],
    }),

    new FieldControl({
      field:"activo",
      label:"Activo",
      type: "select_checkbox",
    }),

    new FieldControl({
      field:"persona",
      label:"Persona",
      type: "autocomplete",
      entityName: "persona",
    }),

    new FieldControl({
      field:"comision",
      label:"Comision",
      type: "autocomplete",
      entityName: "comision",
    }),

  ];  
}

