import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions, FieldInputSelectCheckboxOptions, UmOptions, DownloadOptions, FieldTextareaOptions } from '@class/field-type-options';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';

@Component({
  selector: 'app-alumno-comision-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class AlumnoComisionShowComponent extends ShowRelDynamicComponent {

  readonly entityName: string = "alumno_comision";

  queryData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display).pipe(
      switchMap(
        ids => this.dd.relGetAllFvo(this.entityName, ids, this.fieldsViewOptions)
      ),
      switchMap(
         data => this.legajoAlumno(data)
      ),
      switchMap(
        data => this.cantidadAsignaturasAprobadasAlumnosComision(data)
      ),
      tap(
         data => console.log(data)
      )
    )
  }

  legajoAlumno(data){
    if(!data.length) return of([]);
    var ids = arrayColumn(data, "alu-persona");
    if(!ids.length) return of(data);
    var display = new Display();
    display.setSize(0);
    display.addParam("persona",ids);
    display.addParam("tipo","Legajo");
    return this.dd.all("detalle_persona", display).pipe(
      map(
        response => {
          for(var i = 0; i < data.length; i++) data[i]["_detalle_persona"] = []; //inicializar
          if(!response.length) return data;
          for(var j = 0; j < response.length; j++){
            for(var i = 0; i < data.length; i++) { 
              if(response[j]["persona"] == data[i]["alu-persona"]) 
                data[i]["_detalle_persona"].push(response[j]);
            }
          }
          return data;
        }
      )
    );
  }

  cantidadAsignaturasAprobadasAlumnosComision(data){
    
    for(var i = 0; i < data.length; i++) this.dd.initFields(data[i],["cantidad"]);

    if(!this.params.hasOwnProperty("com-id") || !this.params["com-id"] ) return of(data);

    return this.dd._post("cantidad_asignaturas_aprobadas_alumnos_comision","alumno",this.params["com-id"]).pipe(
      map(
        response => {
          if(!response.length) return data;
          for(var i = 0; i < data.length; i++){
            for(var j = 0; j < response.length; j++){
              if(data[i]["alumno"] == response[j]["alumno"]) {
                this.dd.assignFields(data[i],response[j],["cantidad_aprobada","cantidad_no_aprobada","_disposicion_no_aprobada"])
                break;
              }
            }
          }
          return data;
        }
      )
    );  
  }


  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"alu_per-nombres",
      label:"Nombres",
      aux:new RouterLinkOptions({path: "alumno-admin-rel", params:{persona:"{{alu-persona}})"}}), 
    }),
    new FieldViewOptions({
      field:"alu_per-apellidos",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"alu_per-numero_documento",
      label:"Número Documento",
    }),
    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type: new FieldInputCheckboxOptions(),
      aux:new InputPersistOptions({
         params: {id:"{{id}}"},
         entityName:"alumno_comision",
         fieldName:"activo",
      })
    }),
    new FieldViewOptions({
      field:"alu-anio_ingreso",
      label:"Año Ingreso",
      // type: new FieldInputSelectParamOptions({options:['1','2','3','4','5','6','7','8','9']}),
      // aux:new InputPersistOptions({
      //   entityName:"alumno",
      //   fieldName:"anio_ingreso",
      //   params: {id:"{{alumno}}"},
      // })
    }),
    new FieldViewOptions({
      field:"alu-estado_inscripcion",
      label:"Estado inscripcion",
      // type: new FieldInputSelectParamOptions({options:['Correcto','Indeterminado','Caso Particular']}),
      // aux:new InputPersistOptions({
      //   entityName:"alumno",
      //   fieldName:"estado_inscripcion",
      //   params: {id:"{{alumno}}"},
      // })
    }),
    new FieldViewOptions({
      field:"alu-estado_legajo",
      label:"Estado legajo",
      // type: new FieldInputSelectParamOptions({options:['Completo','Incompleto']}),
      // aux:new InputPersistOptions({
      //   entityName:"alumno",
      //   fieldName:"estado_legajo",
      //   params: {id:"{{alumno}}"},
      // })
    }),
    new FieldViewOptions({
      field:"alu-adeuda_inscripcion",
      label:"Adeuda Inscripcion",
      // type: new FieldTextareaOptions(),
      // aux:new InputPersistOptions({
      //   entityName:"alumno",
      //   fieldName:"adeuda_inscripcion",
      //   params: {id:"{{alumno}}"},
      // })
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type:new TypeLabelOptions({entityName: "comision"}),
    }),
    new FieldViewOptions({
      field:"alu_per-email",
      label:"Email",
    }),
    new FieldViewOptions({
      field:"alu_per-telefono",
      label:"Teléfono",
      type: new FieldInputTextOptions(),
      aux:new InputPersistOptions({
         entityName:"persona",
         fieldName:"telefono",
         params: {id:"{{alu-persona}}"}//utilizar {{key}} para identificar valor del conjunto de datos
      })
    }),
    new FieldViewOptions({
      field:"cantidad_aprobada",
      label:"Asignaturas aprobadas",
    }),
    new FieldViewOptions({
      field:"_detalle_persona",
      label:"Legajo",
      type: new UmOptions({fields:[
        new FieldViewOptions({ field:"descripcion" }),
        new FieldViewOptions({ field:"archivo", type:new DownloadOptions() }),
      ]})
    }),
    // new FieldViewOptions({
    //   field:"_disposicion_no_aprobada",
    //   label:"Asignaturas restantes",
    //   type: new UmOptions({fields:[
    //     new FieldViewOptions({ field:"asi_codigo" }),
    //     new FieldViewOptions({ field:"pla_anio" }),
    //     new FieldViewOptions({ field:"pla_semestre" }),
    //   ]})
    // })
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"alu_per-search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
      width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    }),
  
    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"alu-persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:'persona'}),
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type: new FieldInputAutocompleteOptions({entityName:'comision'}),
    }),
  ];  
}

