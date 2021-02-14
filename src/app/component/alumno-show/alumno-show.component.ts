import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { InputPersistOptions } from '@class/field-view-aux-options';

@Component({
  selector: 'app-alumno-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class AlumnoShowComponent extends ShowComponent {

  readonly entityName: string = "alumno";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type:"si_no",
    }),
    new FieldViewOptions({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type:"si_no",
    }),
    new FieldViewOptions({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type:"si_no",
    }),
    new FieldViewOptions({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type:"si_no",
    }),
    new FieldViewOptions({
      field:"anio_ingreso",
      label:"Anio Ingreso",
    }),
    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type:"input_checkbox",
      entityName:"alumno",
      aux:new InputPersistOptions({
        params:{id:"{{id}}",api:"persist"}
      })
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type:"label",
      entityNameRef: "persona",
      //routerLink: "persona-detail",
      //queryParamField:"persona", 
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type:"label",
      entityNameRef: "comision",
      //routerLink: "comision-detail",
      //queryParamField:"comision", 
    }),
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"per-search",
      label:"Buscar",
      widthSm: "100%",
      widthGtSm: "100%",
      type:"input_text"
    }),

    new FieldViewOptions({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type: "input_select_checkbox",
    }),

    new FieldViewOptions({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type: "input_select_checkbox",
    }),

    new FieldViewOptions({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type: "input_select_checkbox",
    }),

    new FieldViewOptions({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type: "input_select_checkbox",
    }),

    new FieldViewOptions({
      field:"anio_ingreso",
      label:"Anio Ingreso",
      type: "input_select_param",
      options: ['1','2','3'],
    }),

    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type: "input_select_checkbox",
    }),

    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: "input_autocomplete",
      entityName: "persona",
    }),

    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type: "input_autocomplete",
      entityName: "comision",
    }),

  ];  


  activoInput: FieldViewOptions = new FieldViewOptions({
    field:"activo", 
    type:"input_checkbox"
  });

}

