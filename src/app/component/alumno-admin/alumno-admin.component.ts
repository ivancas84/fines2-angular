import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { RequiredValidatorMsg, UniqueValidatorMsg } from '@class/validator-msg';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputUploadConfig } from '@component/input-upload/input-upload.component';
import { StructureComponent } from '@component/structure/structure.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { emptyUrl } from '@function/empty-url.function';
import { isEmptyObject } from '@function/is-empty-object.function';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';


@Component({
  selector: 'app-alumno-admin',
  templateUrl: './alumno-admin.component.html',
})

export class AlumnoAdminComponent extends StructureComponent {

  constructor(
    protected override dialog: MatDialog,
    protected override storage: SessionStorageService,
    protected override dd: DataDefinitionToolService, 
    protected override snackBar: MatSnackBar,
    protected override router: Router, 
    protected override location: Location, 
    protected override route: ActivatedRoute, 
    protected validators: DdAsyncValidatorsService,
  ) { 
    super(dialog,storage,dd,snackBar,router,location,route)
  }
  
  override control: FormGroup = new FormGroup({})

  controlPersona: FormGroup =  new FormGroup({
    "numero_documento":new FormControl(null,{
      validators:[Validators.required],
      asyncValidators:[this.validators.unique("numero_documento", "persona")]
    }),
    "cuil":new FormControl(null,{
      asyncValidators:[this.validators.unique("cuil", "persona")]
    })
  })
  controlAlumno: FormGroup = new FormGroup({})
  controlDetallePersona: FormArray = new FormArray([])
  controlComision: FormArray = new FormArray([])
  
  configPersona: FormGroupConfig = new FormGroupConfig({
    nombres: new InputTextConfig,
    apellidos: new InputTextConfig,
    numero_documento: new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg(), new UniqueValidatorMsg()]
    }),
    cuil: new InputTextConfig({
      validatorMsgs:[new UniqueValidatorMsg()]
    }),
    genero: new InputSelectParamConfig({
      options:["Femenino","Masculino","Otro"]
    }),
    fecha_nacimiento: new InputDateConfig,
    telefono: new InputTextConfig,
    email: new InputTextConfig,
    lugar_nacimiento: new InputTextConfig,
    telefono_verificado: new InputCheckboxConfig,
    email_verificado: new InputCheckboxConfig,
    info_verificada: new InputCheckboxConfig,
  })

  configAlumno: FormGroupConfig = new FormGroupConfig({
    documentacion_inscripcion: new InputSelectParamConfig({
      options:["Constancia", "Certificado", "Analítico parcial", "Analítico completo"]
    }),
    anio_inscripcion: new InputSelectParamConfig({
      options:[1,2,3,4,5,6,7,8,9]
    }),
    anio_inscripcion_completo: new InputSelectCheckboxConfig({
    }),
    establecimiento_inscripcion: new InputTextConfig({
    }),
    resolucion_inscripcion: new InputSelectConfig({
      entityName:"resolucion",
      width:new FieldWidthOptions({
        gtSm: "50%" //screen and (min-width: 960px)
      })
    }),
    anio_ingreso: new InputSelectParamConfig({
      options:["1","2","3"]
    }),
    plan: new InputSelectConfig,
    adeuda_deudores: new InputTextConfig,
    adeuda_legajo: new InputTextConfig,
    libro_folio: new InputCheckboxConfig,
    estado_inscripcion: new InputSelectParamConfig({
      options:["Correcto","Correcto incompleto", "Indeterminado","Caso particular","Titulado"]
    }),
    observaciones: new TextareaConfig,
  })

  configDetallePersona: FormArrayConfig = new FormArrayConfig({
    descripcion: new InputTextConfig,
    archivo: new InputUploadConfig,
    persona: new FormControlConfig
  })

  configComision: FormArrayConfig = new FormArrayConfig({
    comision: new InputAutocompleteConfig,
    activo: new InputCheckboxConfig
  })

  optColumn: FormControlConfig[] = [
    new EventIconConfig({
      action:"remove",
      color: "accent",
      fieldEvent:this.optField,
      icon:"delete"
    })
  ]; //columna opciones para ambas tablas

  optFooterDetallePersona: AbstractControlViewOption[] = [
    {
      config: new EventIconConfig({
        icon: "add", //texto del boton
        action: "add_detalle_persona", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
      control: this.controlDetallePersona
    },
    {
      config: new EventButtonConfig({
        text: "Guardar Legajo", //texto del boton
        action: "submit_detalle_persona", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
    }
  ];
  optFooterComision: AbstractControlViewOption[] = [
    {
      config: new EventIconConfig({
        icon: "add", //texto del boton
        action: "add_comision", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
      control: this.controlComision
    },
  ];

  override ngOnInit(){
    this.configPersona.initAdmin()
    this.configPersona.initControl(this.controlPersona)
    this.configAlumno.initAdmin()
    this.configAlumno.initControl(this.controlAlumno)
    this.configDetallePersona.initFactory()
    this.configDetallePersona.initAdmin()
    this.configComision.initFactory()
    this.configComision.initAdmin()

    this.control.addControl("per",this.controlPersona)
    this.control.addControl("alumno",this.controlAlumno)
    this.control.addControl("per-detalle_persona/persona",this.controlDetallePersona)
    this.control.addControl("alumno_comision/alumno",this.controlComision)

    super.ngOnInit()
  }

  loadDisplay(): void {
    this.loadDisplay$ = this.display$.pipe(
      switchMap(
        () => {
          return this.initStorage();
        }
      ),
      map(
        data => { 
          this.controlPersona.patchValue(this.configPersona.defaultValues())
          this.controlAlumno.patchValue(this.configAlumno.defaultValues())
          this.controlDetallePersona.clear();
          for(var i = 0; i <data["per-detalle_persona/persona"].length; i++) this.controlDetallePersona.push(this.configDetallePersona.factory!.formGroup());

          this.controlComision.clear();
          for(var i = 0; i <data["alumno_comision/alumno"].length; i++) this.controlComision.push(this.configComision.factory!.formGroup());
          
          this.control.patchValue(data)
          return true;
        }
      ),
    )
  }

  override initData(): Observable<any> {
    var data = {"alumno":{}, "per":{}, "per-detalle_persona/persona":[], "alumno_comision/alumno":[], }
    if(isEmptyObject(this.params)) return of(data)

    return this.dd.unique("alumno", this.params).pipe(
      switchMap(
        alumno => {
          if(isEmptyObject(alumno)) return of(data) 
          data["alumno"] = alumno
          return this.initPersona(data) 
        }
      ),
    )
  }

  initPersona(data: { [x: string]: any }): Observable<any>{
    return this.dd.get("persona", data["alumno"]["persona"]).pipe(
      switchMap(
        persona => {
          if(isEmptyObject(persona)) return of(data) 
          data["per"] = persona
          return this.initMultiple(data)
        }
      )
    )
  }

  initMultiple(data: { [x: string]: any }): Observable<any>{
    var display = new Display()
    display.setParams({"persona":data["alumno"]["persona"]})

    var display2 = new Display()
    display2.setParams({"alumno":data["alumno"]["id"]})


    return combineLatest([
      this.dd.all("detalle_persona", display),
      this.dd.all("alumno_comision", display2),
      
    ]).pipe(
      map(
        response => {
          var detalle_persona_ = response[0];
          var alumno_comision_ = response[1];

          if(detalle_persona_.length) data["per-detalle_persona/persona"] = detalle_persona_ 
          if(alumno_comision_.length) data["alumno_comision/alumno"] = alumno_comision_
          
          return data
        }
      )
    )
  }

  override persist(): Observable<any> {
    return this.dd._post("persist_rel", "alumno", this.serverData())
  }


  override initDisplay() {
    /**
     * Inicializar propiedad display$
     * 
     * Por defecto se inicializa con la propiedad params
     */
    var display = new Display();
    display.setSize(100); //se asigna size por defecto por las dudas
    display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  getStorageValues() {
    return this.control.getRawValue()
  }


  override switchOptField(data: { action: string; [x: string]: any; }): void{
    switch(data.action){
      case "remove": 
        var index = data["index"]
        var fa: FormArray = data["control"].parent as FormArray
        var fg: FormGroup = fa.controls[index] as FormGroup
        if(!fg.get("id")!.value) fa.removeAt(index)
        else fg.get("_mode")!.setValue("delete");
      break;
      case "add_comision":
        var fg = this.configComision.factory!.formGroup();
        this.controlComision.push(fg); 
      break;
      case "add_detalle_persona":
        var fg = this.configDetallePersona.factory!.formGroup();
        fg.get("persona")!.setValue((this.controlPersona.get("id") as FormControl).value)
        console.log(this.controlAlumno);
        console.log(fg);
        this.controlDetallePersona.push(fg); 
      break;
      case "submit_detalle_persona":
        this.isSubmitted = true;
        if (!this.control.valid) {
          this.cancelSubmit();
        } else {
          this.submitDetallePersona_();
        } 
      break;
      default: super.switchOptField(data)  
    }
  }

  submitDetallePersona_() {
    var s = this.dd._post("persist_rows", "detalle_persona", this.controlDetallePersona.value).subscribe({
      next: response => {
        this.response = response
        this.submitted()        
      },
      error: error => { 
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    });
    this.subscriptions.add(s);
  }

}


  
  
