import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { OptEventIcon } from '@class/opt';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-toma-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class TomaShowOptionsComponent extends ShowDynamicComponent {

  readonly entityName: string = "toma";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"fecha_toma",
      label:"Fecha Toma",
      type:new FieldDateOptions({format:"dd/MM/yyyy"})
    }),
    new FieldViewOptions({
      field:"estado",
      label:"Estado",
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldViewOptions({
      field:"comentario",
      label:"Comentario",
    }),
    new FieldViewOptions({
      field:"tipo_movimiento",
      label:"Tipo Movimiento",
    }),
    new FieldViewOptions({
      field:"estado_contralor",
      label:"Estado Contralor",
    }),
    new FieldViewOptions({
      field:"calificacion",
      label:"Calificacion",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"temas_tratados",
      label:"Temas Tratados",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"asistencia",
      label:"Asistencia",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"sin_planillas",
      label:"Sin Planillas",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"enlace_planillas",
      label:"Enlace Planillas",
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
      field:"reemplazo",
      label:"Reemplazo",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path: "persona-detail", params:{id:"{{reemplazo}})"}}), 
    }),
    new FieldViewOptions({
      field:"planilla_docente",
      label:"Planilla Docente",
      type:new TypeLabelOptions({entityName: "planilla_docente"}),
      aux:new RouterLinkOptions({path: "planilla-docente-detail", params:{id:"{{planilla_docente}})"}}), 
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
      field:"curso",
      label:"Curso",
      type: new FieldInputAutocompleteOptions({entityName:'curso'}),
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
      field:"planilla_docente",
      label:"Planilla Docente",
      type: new FieldInputAutocompleteOptions({entityName:'planilla_docente'}),
    }),
  ];  

  optColumn = [
    new OptEventIcon({action:"email_registro", template:"mail"}),
    //new OptEventIcon({action:"test2", template:"mail_outline"}),
    //new OptEventIcon({action:"test1", template:"mail"}),
    //new OptEventIcon({action:"test2", template:"mail_outline"})
  ]


  switchAction($event:any){ 
    switch($event.action){
      case "email_registro": 
        this.dd._post("email_confirmacion","toma",$event.data).subscribe(
          response => {
            console.log(response);
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Email enviado", message: "Se ha enviado el email de confirmación"}
            })
          }
        )
      break;
    } 
  }

}

