import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { FormGroupConfig } from '@class/reactive-form-config';
import { RequiredValidatorMsg } from '@class/validator-msg';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { StructureComponent } from '@component/structure/structure.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { logValidationErrors } from '@function/log-validation-errors';
import { InputSelectValueConfig } from '@component/input-select-value/input-select-value.component';

@Component({
  selector: 'app-comision-admin',
  templateUrl: './comision-admin.component.html',
})

export class ComisionAdminComponent extends StructureComponent {
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
    planificacion: new InputAutocompleteConfig({
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    modalidad: new InputTextConfig({
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
    super(dd,storage,dialog,snackBar,router,route,location)
  }

  override ngOnInit(){
    this.configComision.initAdmin()
    this.configComision.initControl(this.controlComision)

    this.control.addControl("comision",this.controlComision)
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

    }
    if(isEmptyObject(this.params)) return of(data)

    return this.dd.unique("comision", this.params).pipe(
      map(
        (comision: any) => {
          if(isEmptyObject(comision)) return data
          data["comision"] = comision
          return data;
        }
      ),
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
      default: super.switchOptField(data)
    }
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


  
  
