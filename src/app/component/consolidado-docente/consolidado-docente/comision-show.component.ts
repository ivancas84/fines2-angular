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
    this.display.setParamsByQueryParams(params);
    this.display$.next(this.display); //@todo reemplazar uso de display$ por display
  }

}

