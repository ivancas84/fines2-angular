import { Input, OnInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Display } from '@class/display';
import { InputSelectComponent } from '@component/input-select/input-select.component';

@Component({
  selector: 'app-input-curso-short-select',
  templateUrl: './input-curso-short-select.component.html',
})
export class InputCursoShortSelectComponent extends InputSelectComponent {
  entityName: string = "curso";
  @Input() id: string;

  ngOnInit(): void {
    if(!this.title) this.title = this.entityName;
    var display = new Display();
    display.addParam("comision", this.id);
    display.setOrder({asi_nombre:"ASC"});
    this.options$ = this.dd.all(this.entityName, display);
  }

}
