import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputTextOptions, FieldHiddenOptions } from '@class/field-type-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Display } from '@class/display';

@Component({
  selector: 'app-sede-cens',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class SedeCensComponent extends ShowRelDynamicComponent {

  readonly entityName: string = "sede";

  initDisplay() {
    this.display = new Display();
    this.display.setSize(100);
    this.display.setParamsByQueryParams(this.params);
    this.display.addCondition([
      ["centro_educativo","=",["2","3","60386fc844004","603870c621106","60391bc7de25c","6047d36d50316","6047d3b1e59ae"]],
      ["fecha_traspaso","=","2021-02-26"]  
    ]);

  }
  
  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"numero",
      label:"Numero",
      //aux: new RouterLinkOptions({path:"sede-admin-2",params:{id:"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"nombre",
      label:"Nombre",
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type:new TypeLabelOptions({entityName: "domicilio"}),
    }),
    new FieldViewOptions({
      field:"ce-nombre",
      label:"Centro Educativo",
      //type:new FieldInputSelectOptions({entityName:"centro_educativo"}),
      //aux: new InputPersistOptions({fieldName:"centro_educativo", entityName: "sede", api:"persist",params:{id:"{{id}}"}})  
      //aux:new RouterLinkOptions({path: "centro-educativo-detail", params:{id:"{{centro_educativo}})"}}), 
    }),
    new FieldViewOptions({
      field:"ce-observaciones",
      label:"Contacto CENS",
      //type:new FieldInputSelectOptions({entityName:"centro_educativo"}),
      //aux: new InputPersistOptions({fieldName:"centro_educativo", entityName: "sede", api:"persist",params:{id:"{{id}}"}})  
      //aux:new RouterLinkOptions({path: "centro-educativo-detail", params:{id:"{{centro_educativo}})"}}), 
    }),
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"numero",
      label:"Numero",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"centro_educativo",
      label:"Centro Educativo",
      type: new FieldHiddenOptions(),
    }),
  ];  
}

