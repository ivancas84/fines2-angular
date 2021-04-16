import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-options-admin',
  templateUrl: './options-admin.component.html',
})
export class OptionsAdminComponent {
  load$: Observable<any>;
  id:string; //id de cens
  constructor(
    protected dd: DataDefinitionToolService, 
    protected route: ActivatedRoute, 
    protected dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.load$ = this.route.queryParams.pipe(
      tap(
        queryParams => {
          this.id = (queryParams.hasOwnProperty("id")) ? queryParams["id"] : "6047d36d50316";
        },
      ),
    );
  }

}

