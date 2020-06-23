import { Component, OnInit } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Observable, of } from 'rxjs';
import { isEmptyObject } from '@function/is-empty-object.function';
import { Display } from '@class/display';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
    
@Component({
  selector: 'app-telefono-grid',
  templateUrl: './telefono-grid.component.html',
})
export class TelefonoGridComponent extends ShowElementComponent implements OnInit {
  
  telefonos$: Observable<Array<object>>;

  /**
   * telefonos$ se define a partir de data$, 
   * data$ puede sufrir constantes cambios, 
   * por eso telefonos$ se define como ReplaySubject.
   */
  constructor(
    protected dd: DataDefinitionService, protected router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.telefonos$ = this.data$.pipe(mergeMap(
      persona => {
        if(isEmptyObject(persona)) return of(null);
        var d = new Display();
        d.setParams({persona:persona.id})
        return this.dd.all("telefono",d);
      }
    ))
  }
}

