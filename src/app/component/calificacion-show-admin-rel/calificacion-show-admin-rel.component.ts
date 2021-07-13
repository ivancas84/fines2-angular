import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { FieldHiddenOptions, FieldInputTextOptions, FieldControlOptions, FieldInputAutocompleteOptions, FieldTextareaOptions } from '@class/field-type-options';
import { FieldViewOptions } from '@class/field-view-options';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { ShowAdminRelDynamicComponent } from '@component/show-admin-dynamic/show-admin-rel-dynamic.component';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-calificacion-show-admin-rel',
  templateUrl: '../../core/component/show-admin-dynamic/show-admin-dynamic.component.html',
})
export class CalificacionShowAdminRelComponent extends ShowAdminRelDynamicComponent {

  readonly entityName: string = "calificacion";
  persistApi: string = "persist_calificacion"; 

  title: string = "Calificacion"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"cur-id",
      label:"Curso",
      type: new FieldInputAutocompleteOptions({entityName:"curso"}),
      control: new FieldControlOptions({disabled:false, validators: [Validators.required],})
    }),

    new FieldViewOptions({
      field:"per-id",
      label:"Persona",
      type: new FieldHiddenOptions,
    }),
    
    new FieldViewOptions({
      field:"per-apellidos",
      label:"Apellidos",
      type: new FieldInputTextOptions({width:"100px"}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    new FieldViewOptions({
      field:"per-nombres",
      label:"Nombres",
      type: new FieldInputTextOptions({width:"100px"}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    new FieldViewOptions({
      field:"per-numero_documento",
      label:"Número Documento",
      type: new FieldInputTextOptions({width:"100px"}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"nota1",
      label:"Nota1",
      type: new FieldInputTextOptions({width:"60px"}),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(10.00), Validators.min(-10.00)],})
    }),
    new FieldViewOptions({
      field:"nota2",
      label:"Nota2",
      type: new FieldInputTextOptions({width:"60px"}),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(10.00), Validators.min(-10.00)],})
    }),
    new FieldViewOptions({
      field:"nota3",
      label:"Nota3",
      type: new FieldInputTextOptions({width:"60px"}),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(10.00), Validators.min(-10.00)],})
    }),
    new FieldViewOptions({
      field:"porcentaje_asistencia",
      label:"Porcentaje Asistencia",
      type: new FieldInputTextOptions({width:"60px"}),
    }),
    new FieldViewOptions({
      field:"nota_final",
      label:"Nota Final",
      type: new FieldInputTextOptions({width:"60px"}),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(10.00), Validators.min(-10.00)],})
    }),
    new FieldViewOptions({
      field:"crec",
      label:"Crec",
      type: new FieldInputTextOptions({width:"60px"}),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(10.00), Validators.min(-10.00)],})
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"observaciones",
      type: new FieldTextareaOptions(),
    }),
    
  ];   


  initParams(params: any){ 
    /*if(!params.hasOwnProperty("cur-id")) {
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: 'No se encuentra identificado el curso'}
      })
      throw new Error('No se encuentra identificado el curso')
    }*/
    return params;
  }

  ngOnInit(): void {
    this.load$ = this.route.queryParams.pipe(
      tap(
        queryParams => {
          this.load = false;
          this.params = this.initParams(queryParams);
          this.initDisplay();
        },
      ),
      map(
        () => {
          var fc = new FieldViewOptions({
            field:"curso",
            label:"Curso",
            type: new FieldHiddenOptions(),
            default:this.params["cur-id"]
          });
          this.fieldsViewOptions.push(fc)
        }
      ),
      switchMap(
        () => {
          return (this.params.hasOwnProperty("cur-id")) ? this.dd._post("persist","calificacion_curso",this.params["cur-id"]) : of(null);
        }
      ),
      switchMap(
        response => {
          if(response && (response["ids"].length)) this.storage.removeItemsContains("."); 
          //si se realizo alguna insercion eliminamos el storage de las consultas
          return this.initLength();
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
    this.display = new Display();
    this.display.setSize(100);
    this.display.setParamsByQueryParams(this.params);
    this.display.setOrder({"per-apellidos":"asc","per-nombres":"asc"});
    
  }

  
  /*
  serverData(i) {  
    var v = this.forms[i].value;
    v["curso"] = this.display.getParam("cur-id");
    return v;
  }*/
  
}
