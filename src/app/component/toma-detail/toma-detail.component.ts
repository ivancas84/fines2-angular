import { Component } from '@angular/core';
import { DetailComponent } from '@component/detail/detail.component';
import { FieldViewOptions } from '@class/field-view-options';
import { Display } from '@class/display';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Location } from '@angular/common';
import { TableDynamicOptions } from '@class/table-dynamic-options';
import { FieldDateOptions, TypeLabelOptions, FieldYesNoOptions } from '@class/field-type-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';

@Component({
  selector: 'app-toma-detail',
  templateUrl: './toma-detail.component.html',
})
export class TomaDetailComponent extends DetailComponent {
  readonly entityName: string = "toma";

  constructor(
    protected route: ActivatedRoute,
    protected location: Location,
    protected ddt: DataDefinitionToolService,
    protected dialog: MatDialog
  ) {
    super(route, location, ddt, dialog);

  }
  
  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"docente",
      label:"Docente",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path:"persona-detail",params:{id:"{{docente}}"}}),
      width:new FieldWidthOptions({gtSm:"33%"})
    }),

    new FieldViewOptions({
      field:"curso",
      label:"Curso",
      type:new TypeLabelOptions({entityName: "curso"}),
      aux:new RouterLinkOptions({path:"curso-detail",params:{id:"{{curso}}"}}),
      width:new FieldWidthOptions({gtSm:"34%"})
    }),


    new FieldViewOptions({
      field:"reemplazo",
      label:"Reemplazo",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path:"persona-detail",params:{id:"{{reemplazo}}"}}),
      width:new FieldWidthOptions({gtSm:"33%"})
    }),


    
    new FieldViewOptions({
      field:"fecha_toma",
      label:"Fecha Toma",
      type:new FieldDateOptions(),
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
      field:"alta",
      label:"Alta",
      type:new FieldDateOptions({format:"dd/MM/yyyy HH:mm"})
    }),
  ];  

  fieldsViewOptionsApd: FieldViewOptions[] = [
    {
      field:"planilla_docente",
      label:"Planilla Docente",
      type:new TypeLabelOptions({entityName:"planilla_docente"}),
      aux:new RouterLinkOptions({path:"asignacion-planilla-docente-admin", params:{id:"{{id}}"}})
    },
    {
      field:"comentario",
      label:"Comentario",
    },
    {
      field:"reclamo",
      label:"Reclamo",
      type:new FieldYesNoOptions(),
    },
    
  ];  


  ngOnInit() {
    this.load$ = this.route.queryParams.pipe(
      tap(
        queryParams => { 
          this.load = false; 
          this.initParams(queryParams);
          this.initDisplay()
        }
      ),
      switchMap(
        () => {return this.initData()}
      ), 
      switchMap(
        () => {return this.initAsignacionPlanillaDocente();}
      ), 
      map(
        () => { return this.load = true;}
      )
    )
  }

  dataApd: { [index: string]: any }[] = []; //datos de apd

  initAsignacionPlanillaDocente(): Observable<any>{
    var display = new Display;
    display.addCondition(["toma","=", this.data["id"]]);
    display.addOrder("tom-fecha_toma","desc");

    return this.ddt.all("asignacion_planilla_docente",display).pipe(
      map(
        response => {
          return this.dataApd = response;
        }
      )
    );
  }

}

