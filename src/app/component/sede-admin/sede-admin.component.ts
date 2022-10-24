import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { RequiredValidatorMsg } from '@class/validator-msg';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { StructureComponent } from '@component/structure/structure.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { logValidationErrors } from '@function/log-validation-errors';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { Location } from '@angular/common';
import { getControlName } from '@function/get-control-name';
import { InputSelectValueConfig } from '@component/input-select-value/input-select-value.component';

@Component({
  selector: 'app-sede-admin',
  templateUrl: './sede-admin.component.html',
})

export class SedeAdminComponent extends StructureComponent {

  constructor(
    protected override dd: DataDefinitionToolService,
    protected override storage: SessionStorageService,
    protected override dialog: MatDialog,
    protected override snackBar: MatSnackBar,
    protected override router: Router, 
    protected override route: ActivatedRoute, 
    protected override location: Location, 
    protected override fb: FormBuilder, 
    protected validators: DdAsyncValidatorsService,
  ) { 
    super(dd, storage, dialog, snackBar, router, route, location, fb)
  }

  override control: FormGroup = new FormGroup({}, {updateOn:"blur"})

  switchDomicilio: FormControl = new FormControl(true)

  controlSede: FormGroup =new FormGroup({
    numero: new FormControl(null,{
      validators:[Validators.required],
    }),
    nombre: new FormControl(null,{
      validators:[Validators.required],
    }),
    centro_educativo: new FormControl(null,{
      validators:[Validators.required],
    }),
  },{
      asyncValidators:[this.validators.uniqueMultiple("sede", ["numero", "centro_educativo"])]
  })

  configSede: FormGroupConfig = new FormGroupConfig({
    numero: new InputTextConfig({
      type:"number",
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    nombre: new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    centro_educativo: new InputSelectConfig,
    observaciones: new TextareaConfig,
    domicilio: new FormControlConfig,

  })

  controlDomicilio: FormGroup =new FormGroup({
    calle: new FormControl(null,{
      validators:[Validators.required],
    }),
    numero: new FormControl(null,{
      validators:[Validators.required],
    }),
    localidad: new FormControl(null,{
      validators:[Validators.required],
    }),
  })

  configDomicilio: FormGroupConfig = new FormGroupConfig({
    calle: new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    numero: new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    localidad: new InputTextConfig({
      default:"La Plata",
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    entre: new InputTextConfig,
    piso: new InputTextConfig,
    departamento: new InputTextConfig,
    barrio: new InputTextConfig,
  })

  controlComision_: FormArray = new FormArray([new FormControl])

  configComision_: FormArrayConfig = new FormArrayConfig({
    id: new ControlLabelConfig({entityName:"comision"}),
  })

  override ngOnInit(){
    this.configSede.initAdmin()
    this.configSede.initControl(this.controlSede)

    this.configDomicilio.initAdmin()
    this.configDomicilio.initControl(this.controlDomicilio)

    this.configComision_.initFactory()

    this.control.addControl("sede",this.controlSede)
    this.control.addControl("domicilio",this.controlDomicilio)
    this.control.addControl("comision/sede",this.controlComision_)

    

    super.ngOnInit()
  }

  override initDisplay() {
    /**
     * Inicializar propiedad display$
     * 
     * Por defecto se inicializa con la propiedad params
     */
    var display = new Display();
    display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  loadDisplay(): void {
    this.loadDisplay$ = this.display$.pipe(
      switchMap(
        () => {
          return this.initStorage();
        }
      ),
      map(
        (data: any) => { 
          this.controlSede.patchValue(this.configSede.defaultValues())
          this.controlDomicilio.patchValue(this.configDomicilio.defaultValues())

          this.controlComision_.clear();
          for(var i = 0; i <data["comision/sede"].length; i++) this.controlComision_.push(this.configComision_.factory!.formGroup());

          this.control.patchValue(data)

          this.switchDomicilio.setValue(this.controlSede.get("domicilio")?.value != null)

          this.switchDomicilio.valueChanges.subscribe(
            value => {
              if(value) {
                this.controlDomicilio.enable()
                this.controlSede.get("domicilio")?.setValue(this.controlDomicilio.get("id")?.value)
              }
              else {
                this.controlDomicilio.disable()
                this.controlSede.get("domicilio")?.setValue(null)
              }
            }
          )
          return true;
        }
      ),
      
    )
  }

  getStorageValues() {
    return this.control.getRawValue()
  }

  override initData(): Observable<any> {
    var data = {
      "sede":{}, 
      "domicilio":{}, 
      "comision/sede":[], 
    }
    if(isEmptyObject(this.params)) return of(data)

    return this.dd.unique("sede", this.params).pipe(
      switchMap(
        (sede: any) => {
          if(isEmptyObject(sede)) return of(data)
          data["sede"] = sede
          return this.dd.getConnectionObj(data, "domicilio", {id:"id",calle:"calle", numero:"numero", localidad:"localidad", entre:"entre", piso:"piso", departamento:"departamento", barrio:"barrio"}, "sede")
        }
      ),
      switchMap(
        (data: any) => {
          return this.initMultiple(data)
        }

      )
    )
  }

  initMultiple(data: { [x: string]: any }): Observable<any> {
    var display = new Display()
    display.setParams({"sede":data["sede"]["id"]})
    display.setOrder({ "division":"ASC", "cal-anio":"ASC", "cal-semestre":"ASC"})
    return this.dd.all("comision", display).pipe(
      map(
        (comision_: any) => {
          console.log(comision_)
          if(comision_.length) data["comision/sede"] = comision_
          return data
        }
      )
    )
  }

  override switchOptField(data: { action: string; [x: string]: any; }): void {
    switch(data.action){
      case "switch_domicilio":
        console.log(data);
      break;
      case "submit_sede":
        this.isSubmitted = true;
        if (!this.control.valid) {
          this.cancelSubmit();
        } else {
          this.submitSede();
        } 
      break;

      case "submit_domicilio":
        this.isSubmitted = true;
        if (!this.control.valid) {
          this.cancelSubmit();
        } else {
          this.submitDomicilio();
        } 
      break;

      case "crear_curso_":

      break;


    

      case "remove": 
        var index = getControlName(data["control"]) as unknown as number 
        /**
         * NO USAR data[index] porque al eliminar no se reflejan los cambios!
         * En el template se ve que se modifica, pero no se traduce en el componente.
         */
        var fa: FormArray = data["control"].parent as FormArray
        var fg: FormGroup = fa.controls[index] as FormGroup
        if(!fg.get("id")!.value) fa.removeAt(index)
        else fg.get("_mode")!.setValue("delete");
      break;

      default: super.switchOptField(data)
    }
  }

  protected submitSede() {
    var s = this.dd._post("persist", "sede", this.controlSede.value).subscribe({
      next: (response: any) => {
        this.response = response
        this.submitted()        
      },
      error: (error: any) => { 
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    });
    this.subscriptions.add(s);
  }

  protected submitDomicilio() {
    var s = this.dd._post("persist", "domicilio", this.controlDomicilio.value).subscribe({
      next: (response: any) => {
        this.response = response
          this.snackBar.open("Registro realizado", "X");
          this.storage.removeItemsContains(".");
          if (this.response["detail"]) this.storage.removeItemsPersisted(this.response["detail"]);
          this.controlSede.get("domicilio")?.setValue(response["id"])
      },
      error: (error: any) => { 
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    });
    this.subscriptions.add(s);
  }

  override cancelSubmit() {
    super.cancelSubmit()
    logValidationErrors(this.control);
  }
}


  
  
