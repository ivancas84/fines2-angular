import { Component, OnInit } from '@angular/core';
import { getSemester } from '@function/get-semester';
import { AuthService } from '@service/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit { 

  view = [];

  constructor(
    protected auth: AuthService, 
  ) { }

  year?: number;
  semester?: number;
  comisionQueryParams:any = {}
  cursoQueryParams:any = {}


  
  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.semester = getSemester();
    this.cursoQueryParams = {
      "com_cal-anio":this.year,
      "com_cal-semestre":this.semester,
      "com-autorizada":true
    }
    this.comisionQueryParams = {
      "cal-anio":this.year,
      "cal-semestre":this.semester,
      "autorizada":true
    } 
    // var token = this.auth.getToken();
    // this.view = (token && token.hasOwnProperty("view")) ? token["view"] : [];
  }
 
}