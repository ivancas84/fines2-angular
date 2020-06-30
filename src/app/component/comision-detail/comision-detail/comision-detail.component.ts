import { OnInit, Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { FormBuilder } from '@angular/forms';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { AdminComponent } from '@component/admin/admin.component';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { emptyUrl } from '@function/empty-url.function';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '@component/modal-confirm/modal-confirm.component';
import { ModalAlertComponent } from '@component/modal-alert/modal-alert.component';

@Component({
  selector: 'app-comision-detail',
  templateUrl: './comision-detail.component.html',
})
export class ComisionDetailComponent extends AdminComponent {

  readonly entityName: string = "comision";

  public optVer: boolean = true;
  public optCrear: boolean = false;
  public optOpciones: boolean = false;


  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionService, 
    protected toast: ToastService, 
    protected validators: ValidatorsService,
    protected storage: SessionStorageService, 
    protected modalService: NgbModal
  ) {
    super(fb, route, router, location, dd, toast, storage, modalService);
  }

  ngOnInit() {
    this.initData();
  }

  initData(){
    var s = this.route.queryParams.subscribe(
      params => {
        this.setData(params);
        return true;
      },
      error => { this.toast.showDanger(JSON.stringify(error)); }
    )

    this.subscriptions.add(s);
  }

  persist(): Observable<any> {
    /**
     * persistencia
     * Se define un metodo independiente para facilitar la redefinicion
     * @return "datos de respuesta (habitualmente array de logs)"
     */
    return this.dd.persist("horariosComision", this.serverData())
  }

  getProcessedId(logs: Array<any>) {  
    return this.adminForm.get(this.entityName).get("id").value;
  }

  eliminarHorarios(): void {
    /**
     * envio de id par eliminar horarios
     */
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.title = "Eliminar";
    modalRef.componentInstance.message = "Seguro que desea eliminar horarios?";
    modalRef.result.then((result) => {
      if(result) this.confirmarEliminarHorarios();
    });     
  }

  confirmarEliminarHorarios(){
    console.log("estoy");
    var id = this.adminForm.get(this.entityName).get("id").value;
    this.isSubmitted = true; 
    this.dd.persist("eliminarHorariosComision", id).pipe(first()).subscribe(
        response => {
          this.storage.removeItemsPersisted(response)
          let route = emptyUrl(this.router.url) + "?id="+this.getProcessedId(response);
          if(route != this.router.url)  this.router.navigateByUrl('/' + route);
          else this.setData(this.route.snapshot.queryParams)
          /**
           * por mas que sea el mismo valor, se vuelve a asignar y se recarga el formulario
           */
          this.toast.showSuccess("Horarios eliminados");
          this.isSubmitted = false;
        },
        error => {
          console.log(error);
          const modalRef = this.modalService.open(ModalAlertComponent);
          modalRef.componentInstance.title = "Error";
          modalRef.componentInstance.message = error.error;
        }
      );
  }


}



