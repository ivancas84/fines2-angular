import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputTextOptions, FieldInputSelectParamOptions, FieldInputCheckboxOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-centro-educativo-cantidad-sedes-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class CentroEducativoCantidadSedesComponent extends ShowComponent {

  readonly entityName: string = "comision";

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

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"nombre",
      label:"Nombre",
      aux:new RouterLinkOptions({path:"centro-educativo-admin",params:{id:"{{centro_educativo}}"}})

    }),
    new FieldViewOptions({
      field:"cantidad_sedes",
      label:"Cantidad Sedes",
      aux:new RouterLinkOptions({path:"sede-show",params:{centro_educativo:"{{centro_educativo}}"}})
    }),
    new FieldViewOptions({
      field:"cantidad_comisiones",
      label:"Cantidad Comisiones",
      aux:new RouterLinkOptions({path:"comision-show2",params:{"sed-centro_educativo":"{{centro_educativo}}"}})
    }),
    new FieldViewOptions({
      field:"detalle_domicilio",
      label:"Domicilio",
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
    new FieldViewOptions({
      field:"sed-centro_educativo.exists",
      label:"Tiene centro educativo?",
      type: new FieldInputSelectCheckboxOptions(),
    }),
  ];  

  initDisplay() {
    super.initDisplay()
    this.display.setFields({"cantidad_sedes":"sede.count", "cantidad_comisiones":"id.count"})
    this.display.setGroup({"centro_educativo":"sed-centro_educativo"});
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
            return this.dd.getAllColumnData(data, "centro_educativo", "centro_educativo", {nombre:"nombre",domicilio:"domicilio"})
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
}

