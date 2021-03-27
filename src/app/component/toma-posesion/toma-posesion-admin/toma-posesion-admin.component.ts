import { Component } from '@angular/core';
import { AdminComponent } from '@component/admin/admin.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { fastClone } from '@function/fast-clone';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-toma-posesion-admin',
  templateUrl: './toma-posesion-admin.component.html',
})
export class TomaPosesionAdminComponent extends AdminComponent {

  readonly entityName: string = "toma_posesion";

  initParams(params: any){ 
    if(!params.hasOwnProperty("id")){
      this.snackBar.open("Error de parámetros", "X");
      return;
    }
    return params;
  }

  initData(): Observable<any> {
    return of(fastClone(this.display$.value));
  }

  submit(){
    var s = this.persist().subscribe(
      response => {
        this.reload(response);
      },
      error => { 
        console.log(error);
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    );
    this.subscriptions.add(s);
  }


  reload(response){
    if(response) this.router.navigateByUrl('/toma-posesion-realizada');
    else {       
      this.router.navigate(['/registro-abc'], { queryParams: { curso: this.adminForm.get(this.entityName+".id").value, email_abc: this.adminForm.get(this.entityName+".email_abc").value}});
    }
    /**
     * Recargar una vez persistido
     */
    
     //Si existe profe felicitaciones
     //Si no existe profe registrese
  }
}

