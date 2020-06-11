import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';
import { first } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-division-show',
  templateUrl: './division-show.component.html',
})
export class DivisionShowComponent extends ShowComponent {

  readonly entityName: string = "division";
  /**
   * Entidad ficticia
   */

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        var params2 = Object. assign({}, params); 
        if(params2.hasOwnProperty("size")) delete params2["size"];
        if(params2.hasOwnProperty("page")) delete params2["page"];
        this.initDisplay(params2);
        if(!isEmptyObject(params2)) {
          this.initData();
        } 
        /** 
         * Inicializar datos solo si hay parametros definidos
         */
      }
    );      
  }

  initData(){ 
    this.dd.data(this.entityName, this.display$.value).pipe(first()).subscribe(
      rows => {  
        this.collectionSize$.next(rows.length); 
        this.data$.next(rows); 
      }
    ) 
  }

}

