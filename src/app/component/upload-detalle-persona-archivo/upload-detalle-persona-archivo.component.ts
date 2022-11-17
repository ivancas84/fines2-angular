import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { UPLOAD_URL } from '@config/app.config';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Observable, startWith, switchMap, map, first, of } from 'rxjs';

@Component({
  selector: 'app-upload-detalle-persona-archivo',
  templateUrl: './upload-detalle-persona-archivo.component.html',
  styleUrls: ['./upload-detalle-persona-archivo.component.css']
})
export class UploadDetallePersonaArchivoComponent implements OnInit {
  
    @Input() control!: FormControl;
    fileControl: FormControl = new FormControl(); //control adicional para 
    file: any = null; //datos del archivo
    load$!: Observable<any>

    constructor(
      protected dd: DataDefinitionService, 
      protected tools: ComponentToolsService

    ) { }
  
  
    ngOnInit(): void {
      this.load$ = this.control.valueChanges.pipe(
        startWith(this.control.value),
        switchMap(
          value => (value) ? this.dd.get("file", value) : of(null)
        ),
        map(
          row => {
            if(row) {
              this.file = row;
              this.file["link"] = UPLOAD_URL+this.file.content; 
              this.fileControl.setValue("");
              this.fileControl.disable();
            } else {
              this.file = null;
              if(this.control.enabled) this.fileControl.enable();
            }
            return true;
          }
        )
      );
  
    }
  
    @ViewChild('fileSelection') FileSelectInputDialog!: ElementRef;
  
    public OpenAddFilesDialog() {
        this.FileSelectInputDialog.nativeElement.click();
    }
    
    onFileSelect(event: any) {
      this.tools.onFileSelect(event, this.control)
    }
  
}
