import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { ConfigFormGroupFactory, FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { RequiredValidatorMsg } from '@class/validator-msg';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { StructureComponent } from '@component/structure/structure.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { logValidationErrors } from '@function/log-validation-errors';
import { InputSelectValueConfig } from '@component/input-select-value/input-select-value.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { Location } from '@angular/common';
import { getControlName } from '@function/get-control-name';


class CursoConfigFormGroupFactory extends ConfigFormGroupFactory{

  override formGroupCreate(): FormGroup {
    return new FormGroup({
      asignatura: new FormControl(null, {validators:Validators.required}),
      horas_catedra: new FormControl(null, {validators:Validators.required})
    })
    
  }
}

@Component({
  selector: 'app-comision-admin',
  templateUrl: './comision-admin.component.html',
})

export class ComisionAdminComponent extends StructureComponent {

  constructor(
    protected override dd: DataDefinitionToolService,
    protected override storage: SessionStorageService,
    protected override dialog: MatDialog,
    protected override snackBar: MatSnackBar,
    protected override router: Router, 
    protected override route: ActivatedRoute, 
    protected override location: Location, 
    protected validators: DdAsyncValidatorsService,
  ) { 
    super(dd, storage, dialog, snackBar, router, route, location)
  }

  override control: FormGroup = new FormGroup({}, {updateOn:"blur"})

  controlComision: FormGroup =new FormGroup({
    sede: new FormControl(null,{
      validators:[Validators.required],
    }),
    division: new FormControl(null,{
      validators:[Validators.required],
    }),
    planificacion: new FormControl(null,{
      validators:[Validators.required],
    }),
    modalidad: new FormControl(null,{
      validators:[Validators.required],
    }),
    calendario: new FormControl(null,{
      validators:[Validators.required],
    })
  },{
      asyncValidators:[this.validators.uniqueMultiple("comision", ["sede", "division", "planificacion"])]
  })

  configComision: FormGroupConfig = new FormGroupConfig({
    sede: new InputAutocompleteConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    division: new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    planificacion: new InputSelectConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    modalidad: new InputSelectConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    comision_siguiente: new InputAutocompleteConfig({
      entityName:"comision"
    }),
    calendario: new InputAutocompleteConfig,
    turno: new InputSelectValueConfig({
      entityName:"comision"
    }),
    autorizada: new InputCheckboxConfig,
    apertura: new InputCheckboxConfig,
    publicada: new InputCheckboxConfig,
    observaciones: new TextareaConfig,
  })

  controlCurso_: FormArray = new FormArray([new FormControl])

  configCurso_: FormArrayConfig = new FormArrayConfig({
    comision: new FormControlConfig,
    asignatura: new InputSelectConfig({
      validatorMsgs:[new RequiredValidatorMsg]
    }),
    horas_catedra: new InputTextConfig({
      type:"number",
      validatorMsgs:[new RequiredValidatorMsg]
    }),
    horario: new ControlValueConfig,
  })

  optColumn: FormControlConfig[] = [
    new EventIconConfig({
      action:"remove",
      color: "accent",
      fieldEvent:this.optField,
      icon:"delete"
    })
  ]; //columna opciones para todas las tablas



  override ngOnInit(){
    this.configComision.initAdmin()
    this.configComision.initControl(this.controlComision)

    this.configCurso_.factory = new CursoConfigFormGroupFactory(this.configCurso_)
    this.configCurso_.initAdmin()

    this.control.addControl("comision",this.controlComision)
    this.control.addControl("curso/comision",this.controlCurso_)

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
        (data: any) => { 
          this.controlComision.patchValue(this.configComision.defaultValues())

          this.controlCurso_.clear();
          for(var i = 0; i <data["curso/comision"].length; i++) this.controlCurso_.push(this.configCurso_.factory!.formGroup());

          this.control.patchValue(data)
          return true;
        }
      ),
    )
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


  override initData(): Observable<any> {
    var data = {
      "comision":{}, 
      "curso/comision":[], 
    }
    if(isEmptyObject(this.params)) return of(data)

    return this.dd.unique("comision", this.params).pipe(
      switchMap(
        (comision: any) => {
          if(isEmptyObject(comision)) return of(data)
          data["comision"] = comision
          return this.initMultiple(data) 
        }
      ),
    )
  }

  initMultiple(data: { [x: string]: any }): Observable<any> {
    var display = new Display()
    display.setParams({"comision":data["comision"]["id"]})

    return combineLatest([
      this.dd.all("curso", display).pipe(
        switchMap(
          curso_ => this.dd.postAllConnection(curso_, "info","curso_horario",{horario:"horario"},"id","curso")
        )
      )
    ]).pipe(
      map(
        (response: any) => {
          var curso_ = response[0];

          if(curso_.length) data["curso/comision"] = curso_ 

          return data
        }
      )
    )
  }

  override switchOptField(data: { action: string; [x: string]: any; }): void {
    switch(data.action){
      case "submit_comision":
        this.isSubmitted = true;
        if (!this.control.valid) {
          this.cancelSubmit();
        } else {
          this.submitComision();
        } 
      break;

      case "crear_curso_":
        var id = this.controlComision.get("id")?.value
        this.crearCurso_()
      break;

      case "submit_curso_":
        this.isSubmitted = true;
        if (!this.control.valid) {
          this.cancelSubmit();
        } else {
          this.submitCurso_();
        } 
      break;

      case "add_curso_":
        var fg = this.configCurso_.factory!.formGroup();
        fg.get("comision")!.setValue((this.controlComision.get("id") as FormControl).value)
        this.controlCurso_.push(fg); 
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

  protected submitCurso_() {
    var s = this.dd._post("persist_rows", "curso", this.controlCurso_.value).subscribe({
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

  protected crearCurso_(){
    if(!this.controlComision.get("id")?.value) {
      this.snackBar.open("No se encuentra definido el id del curso", "X");
      return;
    }
    
    var s = this.dd._post("persist", "crear_cursos_comision", this.controlComision.get("id")!.value).subscribe({
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


  protected submitComision() {
    var s = this.dd._post("persist", "comision", this.controlComision.value).subscribe({
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

  override cancelSubmit() {
    super.cancelSubmit()
    logValidationErrors(this.control);
  }
}


  
  
