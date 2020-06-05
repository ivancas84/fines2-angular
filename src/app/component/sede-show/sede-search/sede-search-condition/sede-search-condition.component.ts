import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { isEmptyObject } from '@function/is-empty-object.function';
import { SearchConditionComponent } from '@component/search-condition/search-condition.component';

@Component({
  selector: 'app-sede-search-condition',
  templateUrl: './sede-search-condition.component.html',
})
export class SedeSearchConditionComponent extends SearchConditionComponent {
  readonly entityName = 'sede';

  constructor(protected fb: FormBuilder, protected dd: DataDefinitionService) {
    super(fb, dd);
  }
  
  initFilters(condition: Array<any>) {
    var obs = [];
 
    for(let i = 0; i < condition.length; i++){
      if((condition[i][0] == "id") && !isEmptyObject(condition[i][2])) {
        var ob = this.dd.getOrNull(this.entityName,condition[i][2]);
        obs.push(ob);
      }

      if((condition[i][0] == "domicilio") && !isEmptyObject(condition[i][2])) {     
        var ob = this.dd.getOrNull("domicilio",condition[i][2]);
        obs.push(ob);
      }

      if((condition[i][0] == "centro_educativo") && !isEmptyObject(condition[i][2])) {     
        var ob = this.dd.getOrNull("centro_educativo",condition[i][2]);
        obs.push(ob);
      }

    }
    return obs;
  }

}
