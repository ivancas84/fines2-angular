import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { tap, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { arrayColumn } from '@function/array-column';
import { Display } from '@class/display';

@Component({
  selector: 'app-sede-show-3',
  templateUrl: '../../core/component/show/show.component.html',
})
export class SedeShow3Component extends ShowComponent {

  readonly entityName: string = "sede";

  ngOnInit(): void {
    this.load$ = this.route.queryParams.pipe(
      tap(
        queryParams => {
          this.load = false;
          this.params = this.initParams(queryParams);
          this.initDisplay();          
        }
      ),
      switchMap(
        () => this.initData()
      ),
      map(
        ()=> {return this.load = true}
      )
    );
  }

  initDisplay() {
    super.initDisplay()
    this.display.setFields({"sede":"sede"})
    this.display.setSize(0);
  }
  
  initData(): Observable<any>{
    /**
     * Dependiendo de las caracteristicas de la interfaz,
     * puede sobrescribirse omitiendo el uso de display,
     * y directamente utilizar params.
     * Si se utiliza search considerar que tambien esta configurado con display.
     */
    return of({}).pipe(
      switchMap(
        () => {
          //if(!this.length && this.length !== null) return of([]); 
          return this.queryData();
        },
      ),
      tap(
        data => {
          this.length = data.length;
          this.data = data;
        }
      ),      
    )
  }

  queryData(): Observable<any>{
      return this.dd.post("advanced","comision", this.display).pipe(
        switchMap(
          data => {
            return this.allSedes(data, "sede", "sede", {"sed-nombre":"nombre","sed-numero":"numero", "sed-centro_educativo":"centro_educativo", domicilio:"domicilio"})
          }
        ),
        switchMap(
          data => {
            return this.dd.getAllColumnData(data, "sed-centro_educativo", "centro_educativo", {"sed_ce-nombre":"nombre"})
          }
        ),
        switchMap(
          data => {
            return this.dd.getAllColumnData(data, "domicilio", "domicilio", {calle:"calle",entre:"entre",numero:"numero",barrio:"barrio"})
          }
        ),
        map(
          data => {
            for(var i = 0; i < data.length; i++){
              data[i]["detalle_domicilio"] = (data[i]["domicilio"]) ? data[i]["calle"] + " e/" + data[i]["entre"] + " Nº " + data[i]["numero"] + " " + data[i]["barrio"] : null;
            }
            return data;
          }
        )
      );
  }


  allSedes(
    data: { [index: string]: any }[], 
    fkName: string, 
    entityName: string, 
    fields: { [index: string]: any },
  ): Observable<{ [index: string]: any }[]>{
    if(!data.length) return of([]);
    var ids = arrayColumn(data, fkName).filter(function (el) { return el != null; });
    if(!ids.length) return of([]);
    var display = new Display();
    display.setCondition(["id","!=",ids])
    return this.dd.all(entityName, display).pipe(
      map(
        response => {
          if(!response.length) return [];
          var d = [];
          for(var j = 0; j < response.length; j++){
            d[j] = {}
            for(var f in fields){
              if(fields.hasOwnProperty(f)) d[j][f] = response[j][fields[f]];
            }
          }
          return d;
        }
      )
    );  
  }

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"sed-numero",
      label:"Numero",
    }),
    new FieldViewOptions({
      field:"sed-nombre",
      label:"Nombre",
    }),
    new FieldViewOptions({
      field:"detalle_domicilio",
      label:"Domicilio",
    }),
    new FieldViewOptions({
      field:"sed_ce-nombre",
      label:"Centro Educativo",
    }),
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"sed-search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
      width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    }),
    new FieldViewOptions({
      field:"turno",
      label:"Turno",
      type: new FieldInputSelectParamOptions({options:['Mañana','Tarde','Noche']}),
    }),
    new FieldViewOptions({
      field:"autorizada",
      label:"Autorizada",
      type: new FieldInputCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"apertura",
      label:"Apertura",
      type: new FieldInputCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"publicada",
      label:"Publicada",
      type: new FieldInputCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"estado",
      label:"Estado",
      type: new FieldInputSelectParamOptions({options:['Confirma','Rectifica','Desdobla','Reagrupa']}),
    }),
    new FieldViewOptions({
      field:"configuracion",
      label:"Configuracion",
      type: new FieldInputSelectParamOptions({options:['Histórica','Nueva']}),
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
      field:"calendario",
      label:"Calendario",
      type: new FieldInputAutocompleteOptions({entityName:'calendario'}),
    }),
  ];   
}

