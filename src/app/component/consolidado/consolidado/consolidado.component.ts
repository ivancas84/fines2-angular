import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';
import { first } from 'rxjs/operators';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';
import { getSemester } from '@function/get-semester';


@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
})
export class ConsolidadoComponent extends ShowComponent {

  readonly entityName: string = "comision";

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

  initDisplay(params){
    this.display = new Display();
    this.display.setConditionByQueryParams(params);
    if(isEmptyObject(this.display.getOrder())) 
      this.display.setOrder({"sed_numero":"asc", "pla_anio":"asc", "pla_semestre":"asc"});
    this.display.addParamIfNot("autorizada", "true");
    this.display.addParamIfNot("cal_anio", new Date().getFullYear());
    this.display.addParamIfNot("cal_semestre", getSemester());
    this.display.addParamIfNot("sed_centro_educativo", "1");
    this.display.addParamIfNot("modalidad", "1");  
    this.condition$.next(this.display.getCondition());
    this.params$.next(this.display.getParams());
  }

  

}

