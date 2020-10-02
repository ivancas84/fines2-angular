import { Component } from '@angular/core';
import { Display } from '@class/display';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-cd-comision-show',
  templateUrl: './comision-show.component.html',
})
export class CdComisionShowComponent extends ShowComponent {

  readonly entityName: string = "comision";

  initDisplay(params: { [x: string]: any; }) {
    this.display = new Display();
    this.display.setSize(100);
    this.display.addParam("cal_anio", "2020");
    this.display.addParam("cal_semestre", "2");
    this.display.addParam("sed_centro_educativo", "1");
    this.display.addParam("modalidad", "1");
    this.display.addParam("autorizada", true);
    this.display.addParam("publicada", true);
    this.display.setOrder({sed_numero:"asc"})
    this.display$.next(this.display); //@todo reemplazar uso de display$ por display
  }

}

