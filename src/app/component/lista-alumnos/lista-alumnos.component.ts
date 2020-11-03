import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
})
export class ListaAlumnosComponent extends ShowComponent {
  
  entityName: string = "toma";

  initParams(params: any){
    if(params.hasOwnProperty("id") && params["id"]) {
      return params;
    } else {
      throw "Error de parámetros"
    }
  }

  initLength(): Observable<any>{ //@override
    this.length = null;
    return of(null);
  } 

  initData(){ //@override
    return this.dd.get(this.entityName, this.params["id"]);
  }

  
}

