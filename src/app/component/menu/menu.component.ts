import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';
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

  year: number;
  semester: number;
  comisionShowQueryParams:any = {}
  tomaShowQueryParams:any = {}


  
  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.semester = getSemester();
    this.tomaShowQueryParams = {
      "cur_com_cal-anio":this.year,
      "cur_com_cal-semestre":this.semester,
    }
    this.comisionShowQueryParams = {
      "cal-anio":this.year,
      "cal-semestre":this.semester,
      "autorizada":true
    } 
    var token = this.auth.getToken();
    this.view = (token && token.hasOwnProperty("view")) ? token["view"] : [];
  }
 
}