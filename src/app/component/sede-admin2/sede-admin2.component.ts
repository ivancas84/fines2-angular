import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';

@Component({
  selector: 'app-sede-admin2',
  templateUrl: './sede-admin2.component.html',
  styleUrls: ['./sede-admin2.component.css']
})
export class SedeAdmin2Component implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected storage: SessionStorageService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected router: Router, 
    protected route: ActivatedRoute, 
    protected location: Location, 
    protected fb: FormBuilder, 
    protected validators: DdAsyncValidatorsService,
  ) { }

  control: FormGroup = this.fb.group({
    sede:this.fb.group({
      numero:this.fb.control(null,{ validators:[Validators.required] }),
      nombre:this.fb.control(null,{ validators:[Validators.required] }),
      centro_educativo:this.fb.control(null,{ validators:[Validators.required] }),
      observaciones:this.fb.control(null),
      domicilio:this.fb.control(null),
    }),
    domicilio:this.fb.group({
      calle:this.fb.control(null,{ validators:[Validators.required] }),
      numero:this.fb.control(null,{ validators:[Validators.required] }),
      localidad:this.fb.control(null,{ validators:[Validators.required] }),
      entre:this.fb.control(null),
      piso:this.fb.control(null),
      departamento:this.fb.control(null),
      barrio:this.fb.control(null),
    }),
  }, {updateOn:"blur"})


  ngOnInit(): void {
  }

}
