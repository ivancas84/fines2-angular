import { Component, OnInit } from '@angular/core';
import { getSemester } from '@function/get-semester';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit { 

  year: number;
  semester: number;
  
  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.semester = getSemester(); 
  }
}