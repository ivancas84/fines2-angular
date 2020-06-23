import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';
import { Display } from '@class/display';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
    
@Component({
  selector: 'app-detalle-persona-grid',
  templateUrl: './detalle-persona-grid.component.html',
})
export class DetallePersonaGridComponent extends ShowElementComponent { 
 
  detalle$: Observable<any>;
  
  constructor(protected router: Router, protected dd: DataDefinitionService) { 
    super(router);
  }

  ngOnInit(): void {
    this.detalle$ = this.data$.pipe(mergeMap(
      persona => {
        if(isEmptyObject(persona)) return of(null);
        var d = new Display();
        d.setParams({persona:persona.id})
        return this.dd.all("detalle_persona",d);
      }
    ))
  }

}
