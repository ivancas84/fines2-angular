import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { OptEventIcon } from '@class/opt';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-toma-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class TomaShowOptionsComponent extends ShowRelDynamicComponent {

  readonly entityName: string = "toma";

  queryData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display).pipe(
      switchMap(
        ids => this.dd.relGetAllFvo(this.entityName, ids, this.fieldsViewOptions)
      ),
      switchMap(
        data => this.dd.getPostAllColumnData(data,"info","curso","curso","curso_horario",{"horario":"horario"})
      ),
    )
  }

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"fecha_toma",
      label:"Fecha Toma",
      type:new FieldInputDateOptions(),
      aux:new InputPersistOptions({entityName:"toma",fieldName:"fecha_toma"})
    }),
    new FieldViewOptions({
      field:"estado",
      label:"Estado",
      type: new FieldInputSelectParamOptions({options:['Aprobada','Pendiente','Renuncia','Error','Baja','Modificada','Observada']}),
      aux:new InputPersistOptions({entityName:"toma",fieldName:"estado"})
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
      type: new FieldInputSelectParamOptions({options:['Pasar','Modificar','No pasar']}),
      aux:new InputPersistOptions({entityName:"toma",fieldName:"estado_contralor"})
    }),
    /*new FieldViewOptions({
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
    }),*/
    new FieldViewOptions({
      field:"curso",
      label:"Curso",
      type:new TypeLabelOptions({entityName: "curso"}),
    }),
    new FieldViewOptions({
      field:"horario",
      label:"Horario",
    }),
    new FieldViewOptions({
      field:"docente",
      label:"Docente",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path: "persona-admin-rel", params:{id:"{{docente}})"}}), 
    }),
    new FieldViewOptions({
      field:"doc-telefono",
      label:"Telefono",
    }),
    new FieldViewOptions({
      field:"reemplazo",
      label:"Reemplazo",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path: "persona-admin-rel", params:{id:"{{reemplazo}})"}}), 
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
    new FieldViewOptions({
      field:"cur_com_cal-anio",
      label:"Año Calendario",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"cur_com_cal-semestre",
      label:"Semestre Calendario",
      type: new FieldInputTextOptions(),
    }),

    
  ];  

  optColumn = [
    new OptEventIcon({action:"email_confirmacion", template:"mail"}),
    new OptEventIcon({action:"table_delete", template:"delete"}),
  ]


  switchAction($event:any){ 
    switch($event.action){
      case "email_confirmacion": 
        this.dd._post("email_confirmacion","toma",$event.data).subscribe(
          () => {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Email enviado", message: "Se ha enviado el email de confirmación"}
            })
          }
        )
      break;
      default:
        super.switchAction($event)
    } 
  }

}

