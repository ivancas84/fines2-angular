import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FieldHiddenOptions, FieldInputTextOptions, FieldControlOptions, FieldInputAutocompleteOptions } from '@class/field-type-options';
import { FieldViewOptions } from '@class/field-view-options';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { ShowAdminRelDynamicComponent } from '@component/show-admin-dynamic/show-admin-rel-dynamic.component';
import { DataDefinitionRelArrayService } from '@service/data-definition-rel-array/data-definition-rel-array.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-calificacion-show-admin-rel',
  templateUrl: '../../core/component/show-admin-dynamic/show-admin-dynamic.component.html',
})
export class CalificacionShowAdminRelComponent extends ShowAdminRelDynamicComponent {

  readonly entityName: string = "calificacion";
  persistApi: string = "persist_rel_array_unique"; 

  title: string = "Calificacion"

  fieldsViewOptions: FieldViewOptions[] = [
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
 
    
  ];   

  constructor(
    protected dd: DataDefinitionToolService, 
    protected route: ActivatedRoute, 
    protected dialog: MatDialog,
    protected validators: ValidatorsService, //los atributos fieldViewOptions y fieldViewOptionsFiters utilizar validadores
    protected ddra: DataDefinitionRelArrayService,
    protected storage: SessionStorageService, 
  ) {
    super(dd,route,dialog, validators, ddra)
  }

  initParams(params: any){ 
    if(!params.hasOwnProperty("cur-id")) {
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: 'No se encuentra identificado el curso'}
      })
      throw new Error('No se encuentra identificado el curso')
    }
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
          return this.dd._post("persist","calificacion_curso",this.params["cur-id"])
        }
      ),
      switchMap(
        response => {
          console.log(response);
          if(response["ids"].length) this.storage.removeItemsContains("."); 
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

  /*
  serverData(i) {  
    var v = this.forms[i].value;
    v["curso"] = this.display.getParam("cur-id");
    return v;
  }*/
  
}
