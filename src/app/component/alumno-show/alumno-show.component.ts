import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldInputAutocompleteOptions, FieldInputCheckboxOptions, FieldInputSelectCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, TypeLabelOptions, FieldYesNoOptions } from '@class/field-type-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-alumno-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class AlumnoShowComponent extends ShowComponent {

  readonly entityName: string = "alumno";

  queryData(): Observable<any>{
    return this.dd.all(this.entityName, this.display).pipe(
      switchMap(
        data => {
          return this.dd.getAllColumnData(data,"persona","persona",{"per-nombres":"nombres","per-apellidos":"apellidos","per-numero_documento":"numero_documento"})
        }
      )
    );
  }
  
  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"per-apellidos",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"per-nombres",
      label:"Nombres",
    }),
    new FieldViewOptions({
      field:"per-numero_documento",
      label:"Numero Documento",
    }),
    new FieldViewOptions({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"anio_ingreso",
      label:"Anio Ingreso",
    }),
    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      labelDisabled:true,
      type:new FieldInputCheckboxOptions(),
      entityName:"alumno",
      aux:new InputPersistOptions({
        params:{id:"{{id}}",api:"persist"}
      })
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type:new TypeLabelOptions({entityName:"persona"}),
      aux: new RouterLinkOptions({path:"alumno-admin",params:{id:"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type:new TypeLabelOptions({entityName:"comision"}),
      aux: new RouterLinkOptions({path:"comision-admin",params:{id:"{{comision}}"}})
    }),
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"per-search",
      label:"Buscar",
      width:new FieldWidthOptions({sm:"100%",gtSm:"100%"}),
      type:new FieldInputTextOptions()
    }),

    new FieldViewOptions({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type: new FieldInputSelectCheckboxOptions(),
    }),

    new FieldViewOptions({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type: new FieldInputSelectCheckboxOptions(),
    }),

    new FieldViewOptions({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type: new FieldInputSelectCheckboxOptions(),
    }),

    new FieldViewOptions({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type: new FieldInputSelectCheckboxOptions(),
    }),

    new FieldViewOptions({
      field:"anio_ingreso",
      label:"Anio Ingreso",
      type: new FieldInputSelectParamOptions({options: ['1','2','3']}),
    }),

    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type: new FieldInputSelectCheckboxOptions(),
    }),

    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName: "persona"}),
    }),

    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type: new FieldInputAutocompleteOptions({entityName: "comision"}),
    }),
  ];  


  activoInput: FieldViewOptions = new FieldViewOptions({
    field:"activo",
    type: new FieldInputCheckboxOptions(),
  });

}

