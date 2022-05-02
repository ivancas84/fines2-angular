import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormGroupConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { DetailComponent } from '@component/structure/detail.component';

@Component({
  selector: 'app-curso-admin',
  templateUrl: './curso-admin.component.html',
})
export class CursoAdminComponent extends DetailComponent {

  override readonly entityName: string = "curso";

  override config: FormGroupConfig = new FormGroupConfig({
    "comision": new ControlLabelConfig({
      width: new FieldWidthOptions({sm:"100%",gtSm:"100%"})
    }),
    "ige": new InputTextConfig(),
    "asignatura": new ControlLabelConfig(),
  })



}


  
  
