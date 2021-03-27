import { Component, OnInit } from '@angular/core';
import { AuthService } from '@service/auth/auth.service';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    protected storage: SessionStorageService, 
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.storage.clear();
  }

  title = 'Fines 2';
}
