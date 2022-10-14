import { Component, OnInit } from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { LocalStorageService } from '@service/storage/local-storage.service';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    protected session: SessionStorageService, 
    protected local: LocalStorageService, 
    protected dd: DataDefinitionService, 

  ) { }

  ngOnInit(): void {
    this.local.clear();
    
  }

  title = 'Fines 2';
}