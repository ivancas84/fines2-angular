import { Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'calendario-label',
  templateUrl: './calendario-label.component.html',
})
export class CalendarioLabelComponent implements OnChanges {
  
  @Input() entityName: string;
  @Input() id: string;

  label: any;
  constructor(private dd: DataDefinitionService) { }
  
  ngOnChanges(changes: SimpleChanges){
    if( changes['id'] && changes['id'].previousValue != changes['id'].currentValue ) {
      if(!changes['id'].currentValue) this.label = null;
      else {
        this.dd.get(this.entityName, this.id).subscribe(
          row => { this.label = row;  })
      }
    }
  }

}
