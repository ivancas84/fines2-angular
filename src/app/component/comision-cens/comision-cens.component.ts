import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-comision-cens',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class ComisionCensComponent extends ShowComponent {

  readonly entityName: string = "comision";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"turno",
      label:"Turno",
    }),
    new FieldViewOptions({
      field:"division",
      label:"Division",
    }),
    new FieldViewOptions({
      field:"comentario",
      label:"Comentario",
    }),
    new FieldViewOptions({
      field:"autorizada",
      label:"Autorizada",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"apertura",
      label:"Apertura",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"publicada",
      label:"Publicada",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldViewOptions({
      field:"identificacion",
      label:"Identificacion",
    }),
    new FieldViewOptions({
      field:"estado",
      label:"Estado",
    }),
    new FieldViewOptions({
      field:"configuracion",
      label:"Configuracion",
    }),
    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type:new TypeLabelOptions({entityName: "sede"}),
      aux:new RouterLinkOptions({path: "sede-detail", params:{id:"{{sede}})"}}), 
    }),
    new FieldViewOptions({
      field:"modalidad",
      label:"Modalidad",
      type:new TypeLabelOptions({entityName: "modalidad"}),
      aux:new RouterLinkOptions({path: "modalidad-detail", params:{id:"{{modalidad}})"}}), 
    }),
    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type:new TypeLabelOptions({entityName: "planificacion"}),
      aux:new RouterLinkOptions({path: "planificacion-detail", params:{id:"{{planificacion}})"}}), 
    }),
    new FieldViewOptions({
      field:"comision_siguiente",
      label:"Comision Siguiente",
      type:new TypeLabelOptions({entityName: "comision"}),
      aux:new RouterLinkOptions({path: "comision-detail", params:{id:"{{comision_siguiente}})"}}), 
    }),
    new FieldViewOptions({
      field:"calendario",
      label:"Calendario",
      type:new TypeLabelOptions({entityName: "calendario"}),
      aux:new RouterLinkOptions({path: "calendario-detail", params:{id:"{{calendario}})"}}), 
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

