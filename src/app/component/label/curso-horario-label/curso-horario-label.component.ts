import { Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-curso-horario-label',
  templateUrl: './curso-horario-label.component.html',
})
export class CursoHorarioLabelComponent implements OnChanges {
  
  @Input() id: string;

  label: string;

  constructor(private dd: DataDefinitionService) { }
  
  ngOnChanges(changes: SimpleChanges){
    console.log(changes)

    if( changes['id'] && changes['id'].previousValue != changes['id'].currentValue ) {
      console.log(this.id)
      if(!changes['id'].currentValue) this.label = null;
      else {
        this.dd.data("curso_horario", [this.id]).pipe(first()).subscribe(
          (rows:Array<{[key:string]:any}>) => {
            if(rows.length != 1) this.label = null;
            else this.label = rows[0]["horario"];
          }
        );
      }
    }
  }

}
