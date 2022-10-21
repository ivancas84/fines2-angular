import { Component } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FormArrayConfig } from '@class/reactive-form-config';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { StructureComponent } from '@component/structure/structure.component';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'core-table',
  templateUrl: '../../core/component/structure/table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursosTomaPosesion2Component extends StructureComponent {
  entityName: string = "curso"
  /**
   * Estructura principal para administrar un array de elementos
   */
  override control: FormArray = new FormArray([new FormControl]);
  /**
   * Referencia directa del FormArray que formara parte del control
   */
  

  length?: number; //longitud total de los datos a mostrar
  
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga

  /**
   * Por una cuestión de facilidad, los atributos y métodos relativos a busque-
   * da se declaran en ArrayComponent, pero no deberían estar. ArrayComponent
   * debería ser más simple
   */


  initLength(): Observable<any> {
    /**
     * Si no se desea procesar la longitud, retornar of(null)
     */
    return this.dd.post("count", this.entityName, this.display$.value).pipe(
      catchError(
        (error) => {
          this.dialog.open(DialogAlertComponent, {
            data: {title: "Error", message: error.error}
          })
          this.length = 0
          return of(null)
        }
      ),    
      map(
        count => {
          return this.length = count; 
        }
      )
    );
  }
  
  loadDisplay(){
    /**
     * Se define un load independiente para el display, es util para reasignar
     * valores directamente al display y reinicializar por ejemplo al limpiar
     * o resetear el formulario
     */
    this.loadDisplay$ = this.display$.pipe(
      switchMap(
        () => {
          this.load = false
          return this.initLength();
        }
      ),
      switchMap(
        () =>   (this.length === 0) ? of([]) : this.initData()
      ),
      map(
        data => {
          this.setData(data)
          return this.load = true;
        }
      ),
    )
  }

  getStorageValues(): any {
    return this.control.getRawValue()
  }

  setData(data: any[]){
    if (!this.length && data.length) this.length = data.length
    this.control.clear();
    //for(var i = 0; i <data.length; i++) this.control.push(this.config.factory!.formGroup());
    this.control.patchValue(data)
  }
 





}


  
  
