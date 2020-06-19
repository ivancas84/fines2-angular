import { AdminComponent } from '@component/admin/admin.component';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ReplaySubject, Observable, of } from 'rxjs';
import { isEmptyObject } from '@function/is-empty-object.function';
import { first, mergeMap } from 'rxjs/operators';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { Display } from '@class/display';

@Component({
    selector: 'app-sede-admin',
    templateUrl: './sede-admin.component.html',
})
export class SedeAdminComponent extends AdminComponent {

  readonly entityName: string = "sede";
  domicilio$ = new ReplaySubject();
  designaciones$: Observable<any>;

  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionService, 
    protected toast: ToastService, 
    protected validators: ValidatorsService,
    protected storage: SessionStorageService, 
  ) {
    super(fb, route, router, location, dd, toast, storage);
  }

  ngOnInit() {
    this.storageValueChanges();
    this.initData();
    this.initDesignaciones();
  }

  initDesignaciones(){
    this.designaciones$ = this.data$.pipe(mergeMap(
      sede => {
        return this.setDesignaciones(sede)
      }
    ))
  }

  protected setDesignaciones(sede:any): Observable<any> {
    if (isEmptyObject(sede) || !sede["id"]) return of(null);
    var d: Display = new Display;
    d.addCondition(["sede", "=", sede["id"]]);
    return this.dd.all("designacion", d);
  }
 

  setDataFromStorage(formValues: any): void {
    var sede = formValues.hasOwnProperty(this.entityName)? formValues[this.entityName] : null;
    this.data$.next(sede); 
    
    var domicilio = formValues.hasOwnProperty("domicilio")? formValues["domicilio"] : null;
    this.domicilio$.next(domicilio);

    //this.setDesignaciones_(sede);
  }
 

  setDataFromParams(params: any): void {
    if(isEmptyObject(params)) {
      this.data$.next(null);
      this.domicilio$.next(null);
      //this.designaciones$.next(null);
      return;
    }
  
    this.dd.uniqueOrNull(this.entityName, params).pipe(first()).subscribe(
      sede => {
        if (sede) this.data$.next(sede);
        else this.data$.next(params);
  
        this.setDomicilio(sede).subscribe(
          domicilio => {this.domicilio$.next(domicilio);},
          error => {console.log(error)}
        );

        //this.setDesignaciones_(sede);
 
      }
    );
  }

  setDomicilio(sede: object): Observable<any> {
    if (isEmptyObject(sede) || !sede["domicilio"]) return of(null);
    return this.dd.getOrNull("domicilio", sede["domicilio"]);
  }

  serverData() {  
    return this.adminForm.value;
  }

  // setDesignaciones_(sede: object): any {
  //   this.setDes_(sede).subscribe(
  //     designaciones => { this.designaciones$.next(designaciones) },
  //     error => {console.log(error)}
  //   );
  // }
  
 
 
}