import { Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-curso-short-label',
  templateUrl: './curso-short-label.component.html',
})
export class CursoShortLabelComponent implements OnChanges {
  
  @Input() id: string;
  
  row: any;

  constructor(private dd: DataDefinitionService) { }
  
  ngOnChanges(changes: SimpleChanges){
    if( changes['id'] && changes['id'].previousValue != changes['id'].currentValue ) {
      if(!changes['id'].currentValue) this.row = null;
      else {
        this.dd.get("curso", this.id).pipe(first()).subscribe(
          
          (row:any) => {
            this.row = row;}
        );
      }
    }
  }

}
