import { Injectable } from '@angular/core';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { FormControl, ValidatorFn, AsyncValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';
import { timer, of, Observable } from 'rxjs';
import { Display } from '@class/display';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { mergeMap, map } from 'rxjs/operators';
import { ToastService } from '@service/ng-bootstrap/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LocalValidatorsService {

  constructor(protected dd: DataDefinitionService, protected storage: SessionStorageService, protected toast: ToastService) {}

  uniqueComision(): AsyncValidatorFn {
    /**
     * Validar unicidad a traves de varios campos.
     * Ejemplo uniqueMultiple("comision",["division", "sede"]).
     * Se aplica al FormGroup que contiene los fields.
     */
    return (control: FormGroup): Observable<ValidationErrors | null> => {
      return timer(1000).pipe(
        mergeMap(() => {

          if(
            !control.get("sede").value 
            || !control.get("division").value
            || !control.get("modalidad").value
          ) return of(null);

          switch (control.get("modalidad").value) {

            case "1": case "2": //fines2, secundaria con oficios
              if( !control.get("planificacion").value ) return of({ planificacion: true });

              return this.dd.get("planificacion", control.get("planificacion").value).pipe(mergeMap(
                  planificacion => {
                    var display = new Display;
                    display.addParam("sede", control.get("sede").value);
                    display.addParam("division", control.get("division").value);
                    display.addParam("modalidad", control.get("modalidad").value);
                    display.addParam("pla_anio", planificacion.anio);
                    display.addParam("pla_semestre", planificacion.semestre);
                    return this.dd.all("comision", display).pipe(map(
                      comisiones => {
                        if(comisiones.length > 1) return { multiple: true };
                        if(comisiones.length == 1) return (comisiones[0].id && (comisiones[0].id != control.get("id").value)) ? { notUnique: comisiones[0].id } : null;
                      }
                    ));
                  }
              ))

            case "3": case "4": //educacion a distancia, presencial
              if( !control.get("planificacion").value ) return of({ planificacion: true });

              if( !control.get("calendario").value ) return of(null);
            
              return this.dd.get("calendario", control.get("calendario").value).pipe(
                mergeMap(
                  calendario => {
                    var display = new Display;
                    display.addParam("sede", control.get("sede").value);
                    display.addParam("division", control.get("division").value);
                    display.addParam("modalidad", control.get("modalidad").value);
                    display.addParam("cal_anio", calendario["anio"]);
                    display.addParam("cal_semestre", calendario["semestre"]);
                    return this.dd.idOrNull("comision", display).pipe(map(
                      id => {
                        return (id && (id != control.get("id").value)) ? { notUnique: id } : null;
                      } 
                    ))
                  }
                )
              )

            default: return of(null);
          }
        }
      ))  
    }
  }

}
