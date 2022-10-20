import { Component, OnInit } from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { LocalStorageService } from '@service/storage/local-storage.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loadSession$!: Observable<any> //carga de parametros

  constructor(
    protected local: LocalStorageService, 
    protected dd: DataDefinitionService,
  ) { }

  ngOnInit(): void {
    this.local.clear();
    var tree = this.dd.getTree()
    var relations = this.dd.getRelations()

    this.loadSession$ = combineLatest([tree, relations]).pipe(
      map(
        () => {
          return true;
        },
      ),
    )
  }

  title = 'Fines 2';
}