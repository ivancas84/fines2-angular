import { Component, OnInit } from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { LocalStorageService } from '@service/storage/local-storage.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loadParams$!: Observable<any> //carga de parametros

  constructor(
    protected local: LocalStorageService, 

  ) { }

  ngOnInit(): void {
    this.local.clear();
  }

  title = 'Fines 2';
}