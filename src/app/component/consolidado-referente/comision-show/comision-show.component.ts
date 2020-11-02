import { Component } from '@angular/core';
import { Display } from '@class/display';
import { ShowComponent } from '@component/show/show.component';
import { DataToolsService } from '@service/data-tools.service';

@Component({
  selector: 'app-cr-comision-show',
  templateUrl: './comision-show.component.html',
})
export class CrComisionShowComponent extends ShowComponent {

  readonly entityName: string = "comision";

  initDisplay() {
    this.display = DataToolsService.displayComisionesActuales();
  }

}

