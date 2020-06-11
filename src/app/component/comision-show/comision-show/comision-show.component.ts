import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';
import { Display } from '@class/display';
import { getSemester } from '@function/get-semester';

@Component({
  selector: 'app-comision-show',
  templateUrl: './comision-show.component.html',
})
export class ComisionShowComponent extends ShowComponent {

  readonly entityName: string = "comision";

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

  initDisplay(params){
    var display = new Display();
    display.setSize(100);
    display.setParamsByQueryParams(params);
    display.addParamIfNot("autorizada", "true");
    display.addParamIfNot("cal_anio", new Date().getFullYear());
    display.addParamIfNot("cal_semestre", getSemester());
    display.addParamIfNot("sed_centro_educativo", "1");
    display.addParamIfNot("modalidad", "1");
    this.display$.next(display);
  }



}

