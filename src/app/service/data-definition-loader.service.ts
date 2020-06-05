import { Injectable } from '@angular/core';

import { SessionStorageService } from 'src/app/core/service/storage/session-storage.service';
import { ParserService } from 'src/app/core/service/parser/parser.service';
import { DataDefinition } from 'src/app/core/class/data-definition';

import { AsignaturaDataDefinition } from 'src/app/class/data-definition/asignatura-data-definition';
import { CalendarioDataDefinition } from 'src/app/class/data-definition/calendario-data-definition';
import { CargoDataDefinition } from 'src/app/class/data-definition/cargo-data-definition';
import { CentroEducativoDataDefinition } from 'src/app/class/data-definition/centro-educativo-data-definition';
import { ComisionDataDefinition } from 'src/app/class/data-definition/comision-data-definition';
import { ContralorDataDefinition } from 'src/app/class/data-definition/contralor-data-definition';
import { CursoDataDefinition } from 'src/app/class/data-definition/curso-data-definition';
import { DesignacionDataDefinition } from 'src/app/class/data-definition/designacion-data-definition';
import { DiaDataDefinition } from 'src/app/class/data-definition/dia-data-definition';
import { DistribucionHorariaDataDefinition } from 'src/app/class/data-definition/distribucion-horaria-data-definition';
import { DomicilioDataDefinition } from 'src/app/class/data-definition/domicilio-data-definition';
import { EmailDataDefinition } from 'src/app/class/data-definition/email-data-definition';
import { FileDataDefinition } from 'src/app/class/data-definition/file-data-definition';
import { HorarioDataDefinition } from 'src/app/class/data-definition/horario-data-definition';
import { ModalidadDataDefinition } from 'src/app/class/data-definition/modalidad-data-definition';
import { PersonaDataDefinition } from 'src/app/class/data-definition/persona-data-definition';
import { PlanDataDefinition } from 'src/app/class/data-definition/plan-data-definition';
import { PlanificacionDataDefinition } from 'src/app/class/data-definition/planificacion-data-definition';
import { PlanillaDocenteDataDefinition } from 'src/app/class/data-definition/planilla-docente-data-definition';
import { SedeDataDefinition } from 'src/app/class/data-definition/sede-data-definition';
import { TelefonoDataDefinition } from 'src/app/class/data-definition/telefono-data-definition';
import { TipoSedeDataDefinition } from 'src/app/class/data-definition/tipo-sede-data-definition';
import { TomaDataDefinition } from 'src/app/class/data-definition/toma-data-definition';

@Injectable({
  providedIn: 'root'
})
export class DataDefinitionLoaderService {

  constructor(protected stg: SessionStorageService, protected parser: ParserService){ }

  get(name: string): DataDefinition {
    switch(name) {
      case "asignatura": { return new AsignaturaDataDefinition(this.stg, this.parser); }
      case "calendario": { return new CalendarioDataDefinition(this.stg, this.parser); }
      case "cargo": { return new CargoDataDefinition(this.stg, this.parser); }
      case "centro_educativo": { return new CentroEducativoDataDefinition(this.stg, this.parser); }
      case "comision": { return new ComisionDataDefinition(this.stg, this.parser); }
      case "contralor": { return new ContralorDataDefinition(this.stg, this.parser); }
      case "curso": { return new CursoDataDefinition(this.stg, this.parser); }
      case "designacion": { return new DesignacionDataDefinition(this.stg, this.parser); }
      case "dia": { return new DiaDataDefinition(this.stg, this.parser); }
      case "distribucion_horaria": { return new DistribucionHorariaDataDefinition(this.stg, this.parser); }
      case "domicilio": { return new DomicilioDataDefinition(this.stg, this.parser); }
      case "email": { return new EmailDataDefinition(this.stg, this.parser); }
      case "file": { return new FileDataDefinition(this.stg, this.parser); }
      case "horario": { return new HorarioDataDefinition(this.stg, this.parser); }
      case "modalidad": { return new ModalidadDataDefinition(this.stg, this.parser); }
      case "persona": { return new PersonaDataDefinition(this.stg, this.parser); }
      case "plan": { return new PlanDataDefinition(this.stg, this.parser); }
      case "planificacion": { return new PlanificacionDataDefinition(this.stg, this.parser); }
      case "planilla_docente": { return new PlanillaDocenteDataDefinition(this.stg, this.parser); }
      case "sede": { return new SedeDataDefinition(this.stg, this.parser); }
      case "telefono": { return new TelefonoDataDefinition(this.stg, this.parser); }
      case "tipo_sede": { return new TipoSedeDataDefinition(this.stg, this.parser); }
      case "toma": { return new TomaDataDefinition(this.stg, this.parser); }
    }
  }
}
