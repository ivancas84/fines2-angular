import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { OptEventIcon, OptRouteIcon } from '@class/opt';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-comision-show-3',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class ComisionShow3Component extends ShowDynamicComponent {
  readonly entityName: string = "comision";

  queryData(): Observable<any>{
    return this.dd.all(this.entityName, this.display).pipe(
      switchMap(data => {
        return this.dd.getPostAllColumnData(data,"cantidad_alumnos_aprobados_comision", "id", "comision", "calificacion", {"aprobados":"aprobados"} )
      }),
      switchMap(data => {
        return this.dd.getPostAllColumnData(data,"cantidad_alumnos_activos_comision", "id", "comision", "calificacion", {"activos":"activos"} )
      }),
      switchMap(data => {
        return this.dd.advancedColumnDataGroup(data,"comision", "alumno_comision", {"alumnos":"alumno.count"} )
      }),

      switchMap(data => {
        return this.dd.getPostAllColumnData(data, "info", "id", "comision", "horarios_comision", {horario:["dias_dias","hora_inicio","hora_fin"]})
      }),
      
      switchMap(data => {
        return this.dd.getAllColumnData(data, "sede", "sede", {domicilio:"domicilio","sed-nombre":"nombre", "sed-centro_educativo":"centro_educativo", "numero_sede":"numero"}, " - ")
      }),
      switchMap(data => {
        return this.dd.getAllColumnData(data, "sed-centro_educativo", "centro_educativo", {cens:"nombre"}, " - ")
      }),
      switchMap(data => {
        return this.dd.getAllColumnData(data, "planificacion", "planificacion", {plan:"plan",anio:"anio",semestre:"semestre"} )
      }),
      switchMap(data => {
        return this.dd.getAllColumnData(data, "plan", "plan", {orientacion:"orientacion"} )
      }),
      
      // switchMap(data => {
      //   return this.alumnosActivos(data)
      // }),
      map(data => {
        data.map (el => {
          el["sed-numero"] =el["numero_sede"] + el["division"]
          el["tramo"] =el["anio"] + "º" + el["semestre"] + "C"

        }); 
        return data;
      }),
    );
  }




  fieldsViewOptions: FieldViewOptions[] = [
    // new FieldViewOptions({
    //   field:"cens",
    //   label:"CENS",
    // }),
    // new FieldViewOptions({
    //   field:"sed-nombre",
    //   label:"Sede",
    //   aux: new RouterLinkOptions({path:"comision-admin",params:{id:"{{id}}"}})
    // }),
    
    // new FieldViewOptions({
    //   field:"domicilio",
    //   label:"Domicilio",
    //   type:new TypeLabelOptions({entityName:"domicilio"})
    // }),
    new FieldViewOptions({
      field:"sed-numero",
      label:"Numero",
      aux: new RouterLinkOptions({path:"referente-toma",params:{'com-id':"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"tramo",
      label:"Tramo",
    }),
    new FieldViewOptions({
      field:"configuracion",
      label:"Configuracion",
      //type:new FieldInputSelectParamOptions({options:['Histórica','Nueva']}),
      /*aux: new InputPersistOptions({
        entityName:"comision",
        fieldName:"configuracion",
      })*/
    }),
    new FieldViewOptions({
      field:"orientacion",
      label:"Orientacion",
    }),
    
    new FieldViewOptions({
      field:"turno",
      label:"Turno",
    }),
    new FieldViewOptions({
      field:"alumnos",
      label:"Cantidad de alumnos",
    }),
    new FieldViewOptions({
      field:"activos",
      label:"Alumnos activos",
      aux:new RouterLinkOptions({path:"alumno-comision-toma",params:{"com-id":"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"aprobados",
      label:"Alumnos con al menos una asignatura aprobada",
      aux:new RouterLinkOptions({path:"alumnos-aprobados",params:{id:"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"comision_siguiente",
      label:"Comision Siguiente",
      type:new TypeLabelOptions({entityName: "comision"}),
      aux:new RouterLinkOptions({path: "comision-detail", params:{id:"{{comision_siguiente}})"}}), 
    }),
    // new FieldViewOptions({
    //   field:"alumnos",
    //   label:"Estudiantes",
    //   aux:new RouterLinkOptions({path:"alumno-show",params:{comision:"{{id}}"}})
    // }),
    // new FieldViewOptions({
    //   field:"identificacion",
    //   label:"Id Comision",
    // }),
    // new FieldViewOptions({
    //   field:"estado",
    //   label:"Estado",
    //     type:new FieldInputSelectParamOptions({options:['Confirma','Rectifica','Desdobla','Reagrupa']}),
    //   // aux: new InputPersistOptions({
    //   //   entityName:"comision",
    //   //   fieldName:"estado",
    //   //   api:"persist"
    //   // })
    // }),
    // new FieldViewOptions({
    //   field:"observaciones",
    //   label:"Observaciones",
    // }),
    // new FieldViewOptions({
    //   field:"comentario",
    //   label:"Comentario",
    //   //type:new FieldInputTextOptions(),
    //   //aux: new InputPersistOptions()
    // }),
    new FieldViewOptions({
      field:"horario",
      label:"Horario",
      //aux: new RouterLinkOptions({path:"comision-admin",params:{id:"{{id}}"}})
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
      field:"turno",
      label:"Turno",
      type: new FieldInputSelectParamOptions({options:['Mañana','Tarde','Vespertino']}),
    }),
    new FieldViewOptions({
      field:"autorizada",
      label:"Autorizada",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"apertura",
      label:"Apertura",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"publicada",
      label:"Publicada",
      type: new FieldInputCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type: new FieldInputAutocompleteOptions({entityName:'sede'}),
    }),
    new FieldViewOptions({
      field:"modalidad",
      label:"Modalidad",
      type: new FieldInputSelectOptions({entityName:'modalidad'}),
    }),
    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type: new FieldInputSelectOptions({entityName:'planificacion'}),
    }),
    new FieldViewOptions({
      field:"comision_siguiente",
      label:"Comision Siguiente",
      type: new FieldInputAutocompleteOptions({entityName:'comision'}),
    }),
    new FieldViewOptions({
      field:"cal-anio",
      label:"Anio",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"cal-semestre",
      label:"Semestre",
      type: new FieldInputSelectParamOptions({options:["1","2","3"]}),
    }),
    new FieldViewOptions({
      field:"identificacion.exists",
      label:"Tiene identificacion?",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"sed-centro_educativo",
      label:"Centro Educativo",
      type: new FieldInputSelectOptions({entityName:"centro_educativo"}),
    }),
  ];
  
  
  optColumn = [
    new OptRouteIcon({
      action:"alumno-comision-show", 
      template:"edit",
      params:{"com-id":"{{id}}"}
    }),
    new OptRouteIcon({
      action:"comision-admin2", 
      template:"list",
      params:{"id":"{{id}}"}
    }),
    new OptEventIcon({
      action:"actualizar-plan", 
      template:"info"
    }),
    new OptEventIcon({
      action:"actualizar-disposicion-pendiente", 
      template:"dashboard"
    }),

  ]


  switchAction($event:any){ 
    switch($event.action){
      case "actualizar-plan":
        this.dd._post("actualizar_plan_alumnos","alumno",$event.data.id).subscribe(
          () => {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Plan actualizado", message: "Se ha actualizado el plan de los alumnos"}
            })
          }
        )
      break;
      case "actualizar-disposicion-pendiente":
        this.dd._post("actualizar_disposiciones_pendientes_alumnos","alumno",$event.data.id).subscribe(
          () => {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Disposiciones pendientes actualizadas", message: "Se han actualizado las disposiciones pendientes de los alumnos"}
            })
          }
        )
      break;
      default:
        super.switchAction($event)
    } 
  }


}

