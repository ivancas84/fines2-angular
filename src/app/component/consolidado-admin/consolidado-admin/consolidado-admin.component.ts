import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-consolidado-admin',
  templateUrl: './consolidado-admin.component.html',
})
export class ConsolidadoAdminComponent extends ShowComponent {

  readonly entityName: string = "comision";

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

  initDisplay(params: { [x: string]: any; }): void {
    let display = new Display();
    display = new Display();
    display.setSize(100);
    display.setParamsByQueryParams(params);
    if(isEmptyObject(display.getOrder())) 
      display.setOrder({"sed_numero":"asc", "pla_anio":"asc", "pla_semestre":"asc"});
    this.display$.next(display);
  }

  

}

