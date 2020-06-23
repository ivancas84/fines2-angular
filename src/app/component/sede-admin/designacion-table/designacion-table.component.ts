import { Component, OnInit } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';
import { Display } from '@class/display';

@Component({
  selector: 'app-designacion-table',
  templateUrl: './designacion-table.component.html',
})
export class DesignacionTableComponent extends ShowElementComponent implements OnInit {

  designaciones$: Observable<any>;

  constructor(protected router: Router, protected dd: DataDefinitionService) { 
    super(router);
  }

  ngOnInit(): void {
    this.designaciones$ = this.data$.pipe(mergeMap(
      sede => { 
        if (isEmptyObject(sede) || !sede["id"]) return of(null);
        var d: Display = new Display;
        d.addCondition(["sede", "=", sede["id"]]);
        return this.dd.all("designacion", d);
      }
    ))
  }

}

