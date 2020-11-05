import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';
import { getSemester } from '@function/get-semester';
import { AuthService } from '@service/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, OnChanges { 

  @Input() jwt?: string;
  logoutMenu = false;
  loginMenu = true;
  comisionShowMenu = false;

  constructor(
    protected auth: AuthService, 
  ) { 

  }

  year: number;
  semester: number;
  
  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.semester = getSemester(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.jwt.currentValue != changes.jwt.previousValue){
      if(this.auth.isAuthenticated()){
        this.logoutMenu = true;
        this.loginMenu = false;
      } else {
        this.logoutMenu = false;
        this.loginMenu = true;
      }

      if(this.auth.hasPermission(["comision.wx"])){
        this.comisionShowMenu = true;
      }
    }
  }

  logout(){
    this.auth.logout();
  }

 
}