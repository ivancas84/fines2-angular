import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchComponent } from '@component/search/search.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { isEmptyObject } from '@function/is-empty-object.function';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-curso-search',
  templateUrl: './curso-search.component.html',
})
export class CursoSearchComponent extends SearchComponent {
  entity = 'curso';

  constructor(protected fb: FormBuilder)  {
    super(fb);
  }

  /*initData() {
    var obs = [];
 
    for(let i = 0; i < this.condition.length; i++){
      if((this.condition[i][0] == "id") && !isEmptyObject(this.condition[i][2])) {
        var ob = this.dd.getOrNull(this.entityName,this.condition[i][2]);
        obs.push(ob);
      }

      if((this.condition[i][0] == "comision") && !isEmptyObject(this.condition[i][2])) {     
        var ob = this.dd.getOrNull("comision",this.condition[i][2]);
        obs.push(ob);
      }

      if((this.condition[i][0] == "carga_horaria") && !isEmptyObject(this.condition[i][2])) {     
        var ob = this.dd.getOrNull("carga_horaria",this.condition[i][2]);
        obs.push(ob);
      }

    }
    if(obs.length){ forkJoin(obs).subscribe( () => this.initForm() ); }
    else { this.initForm() }
  }*/
}
