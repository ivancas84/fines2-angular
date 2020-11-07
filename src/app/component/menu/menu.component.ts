import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';
import { getSemester } from '@function/get-semester';
import { AuthService } from '@service/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, OnChanges { 

  @Input() jwt?: string;
  authenticated = false;
  logoutMenu = false;
  loginMenu = true;
  view = [];

  constructor(
    protected auth: AuthService, 
  ) { }

  year: number;
  semester: number;
  
  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.semester = getSemester(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.jwt.currentValue != changes.jwt.previousValue){
      this.authenticated = this.auth.isAuthenticated();
      if(this.authenticated){
        var token = this.auth.getToken();
        this.view = (token && token.hasOwnProperty("view")) ? token["view"] : [];
      } else {
        this.view = [];
      }
    }
  }

 
}