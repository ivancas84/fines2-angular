import { Injectable } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalValidators {
  /**
   * Inicialmente se iban a crear funciones independientes para validación
   * Se opto por crear un servicio para poder importar otros servicios necesarios
   */

  constructor(protected dd: DataDefinitionService, protected storage: SessionStorageService) {}

  static emailAbc(): ValidatorFn {
    return Validators.pattern("[A-Za-z0-9._%-]+@abc.gob.ar");
  }

  static cuilDni(): ValidatorFn {
    /**
     * Validar concordancia entre cuil y dni.
     */

    return (control: AbstractControl): ValidationErrors | null => {
      if(!control.get("cuil") || !control.get("numero_documento")) return null;
      /**
       * Los campos pueden crearse dinamicamente, por lo que debe verificarse si se encuentran definidos
       */

      const cuil = String((control.get("cuil") as FormControl).value);
      const numeroDocumento = String((control.get("numero_documento") as FormControl).value);
      
      if(cuil && numeroDocumento){
        const cuil_ = cuil.substring(2,10).replace(/^0+/, '');          
        const numeroDocumento_ = numeroDocumento.replace(/^0+/, '');
        if(cuil_ != numeroDocumento_) {
          return {cuilDni:true}
        }
      }
      return null
    }
  }
}
