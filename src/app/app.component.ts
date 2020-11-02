import { Component, OnInit } from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    protected storage: SessionStorageService, 
    protected cookieService: CookieService,
    protected dd: DataDefinitionService,
  ) { }

  ngOnInit(): void {
    this.storage.clear();

    this.dd._post("test","check").subscribe(
      test => console.log
    )

  }

  title = 'Fines 2';
}
