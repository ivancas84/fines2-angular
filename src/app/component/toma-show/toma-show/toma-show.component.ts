import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldInputDateOptions, FieldInputSelectCheckboxOptions, FieldTextareaOptions } from '@class/field-type-options';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';

@Component({
  selector: 'app-toma-show',
  templateUrl: '../../../core/component/show/show-dynamic.component.html',
})
export class TomaShowComponent extends ShowRelDynamicComponent {

  readonly entityName: string = "toma";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"cur-ige",
      label:"IGE",
      aux: new RouterLinkOptions({path:"calificacion-show-admin-rel",params:{"cur-id":"{{curso}}"}})
    }),
    new FieldViewOptions({
      field:"estado",
      label:"Estado",
      aux: new RouterLinkOptions({path:"calificacion-show-admin-rel",params:{"cur-id":"{{curso}}"}})

    }),
    new FieldViewOptions({
      field:"calificacion",
      label:"Calificacion",
      labelDisabled:true,
      type:new FieldInputCheckboxOptions(),
      aux:new InputPersistOptions({
        entityName:"toma",
        fieldName:"calificacion",
      })
    }),
    new FieldViewOptions({
      field:"temas_tratados",
      label:"Temas Tratados",
      labelDisabled:true,
      type:new FieldInputCheckboxOptions(),
      aux:new InputPersistOptions({
        entityName:"toma",
        fieldName:"temas_tratados",
      })
    }),
    new FieldViewOptions({
      field:"asistencia",
      label:"Asistencia",
      labelDisabled:true,
      type:new FieldInputCheckboxOptions(),
      aux:new InputPersistOptions({
        entityName:"toma",
        fieldName:"asistencia",
      })
    }),
    new FieldViewOptions({
      field:"sin_planillas",
      label:"Sin Planillas",
      labelDisabled:true,
      type:new FieldInputCheckboxOptions(),
      aux:new InputPersistOptions({
        entityName:"toma",
        fieldName:"sin_planillas",
      })
    }),
    new FieldViewOptions({
      field:"curso",
      label:"Curso",
      type:new TypeLabelOptions({entityName: "curso"}),
      aux:new RouterLinkOptions({path: "curso-detail", params:{id:"{{curso}})"}}), 
    }),
    new FieldViewOptions({
      field:"docente",
      label:"Docente",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path: "persona-detail", params:{id:"{{docente}})"}}), 
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
      type:new FieldTextareaOptions(),
      aux:new InputPersistOptions({
        entityName:"toma",
        fieldName:"observaciones",
      }), 
    }),

  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
      width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    }),
    new FieldViewOptions({
      field:"fecha_toma",
      label:"Fecha Toma",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"calificacion",
      label:"Calificacion",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"temas_tratados",
      label:"Temas Tratados",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"asistencia",
      label:"Asistencia",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"sin_planillas",
      label:"Sin Planillas",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"cur-asignatura",
      label:"Asignatura",
      type: new FieldInputSelectOptions({entityName:'asignatura'}),
    }),
    new FieldViewOptions({
      field:"cur_com_sed-centro_educativo",
      label:"Centro Educativo",
      type: new FieldInputSelectOptions({entityName:'centro_educativo'}),
    }),
    new FieldViewOptions({
      field:"docente",
      label:"Docente",
      type: new FieldInputAutocompleteOptions({entityName:'persona'}),
    }),
    new FieldViewOptions({
      field:"reemplazo",
      label:"Reemplazo",
      type: new FieldInputAutocompleteOptions({entityName:'persona'}),
    }),
    new FieldViewOptions({
      field:"cur_com_cal-anio",
      label:"Año Calendario",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"cur_com_cal-semestre",
      label:"Semestre Calendario",
      type: new FieldInputSelectParamOptions({options:[1,2,3]}),
    }),
    new FieldViewOptions({
      field:"cur_com-numero",
      label:"Número de Comisión",
      type: new FieldInputTextOptions(),
    }),
    
    
  ];  
}

