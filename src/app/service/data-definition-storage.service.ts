import { Injectable } from '@angular/core';

import { SessionStorageService } from '@service/storage/session-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DataDefinitionStorageService {

  constructor(protected stg: SessionStorageService){ }

  storage(entityName: string, row: { [index: string]: any }): void {
    switch(entityName) {
      case "asignacion_planilla_docente": { this.storageAsignacionPlanillaDocente(row); }
      case "asignatura": { this.storageAsignatura(row); }
      case "calendario": { this.storageCalendario(row); }
      case "cargo": { this.storageCargo(row); }
      case "centro_educativo": { this.storageCentroEducativo(row); }
      case "comision": { this.storageComision(row); }
      case "contralor": { this.storageContralor(row); }
      case "curso": { this.storageCurso(row); }
      case "designacion": { this.storageDesignacion(row); }
      case "detalle_persona": { this.storageDetallePersona(row); }
      case "dia": { this.storageDia(row); }
      case "distribucion_horaria": { this.storageDistribucionHoraria(row); }
      case "domicilio": { this.storageDomicilio(row); }
      case "email": { this.storageEmail(row); }
      case "file": { this.storageFile(row); }
      case "horario": { this.storageHorario(row); }
      case "modalidad": { this.storageModalidad(row); }
      case "persona": { this.storagePersona(row); }
      case "plan": { this.storagePlan(row); }
      case "planificacion": { this.storagePlanificacion(row); }
      case "planilla_docente": { this.storagePlanillaDocente(row); }
      case "sede": { this.storageSede(row); }
      case "telefono": { this.storageTelefono(row); }
      case "tipo_sede": { this.storageTipoSede(row); }
      case "toma": { this.storageToma(row); }
    }
  }
  storageAsignacionPlanillaDocente(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('planilla_docente_' in rowCloned)
    ){
      this.stg.setItem('planilla_docente' + rowCloned['planilla_docente_'].id, rowCloned['planilla_docente_']);
      delete rowCloned['planilla_docente_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_'])
    && ('domicilio_' in rowCloned['toma_']['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['toma_']['curso_']['comision_']['sede_']['domicilio_'].id, rowCloned['toma_']['curso_']['comision_']['sede_']['domicilio_']);
      delete rowCloned['toma_']['curso_']['comision_']['sede_']['domicilio_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_'])
    && ('tipo_sede_' in rowCloned['toma_']['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['toma_']['curso_']['comision_']['sede_']['tipo_sede_'].id, rowCloned['toma_']['curso_']['comision_']['sede_']['tipo_sede_']);
      delete rowCloned['toma_']['curso_']['comision_']['sede_']['tipo_sede_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_'])
    && ('centro_educativo_' in rowCloned['toma_']['curso_']['comision_']['sede_'])
    && ('domicilio_' in rowCloned['toma_']['curso_']['comision_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['toma_']['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['toma_']['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['toma_']['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_'])
    && ('centro_educativo_' in rowCloned['toma_']['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['toma_']['curso_']['comision_']['sede_']['centro_educativo_'].id, rowCloned['toma_']['curso_']['comision_']['sede_']['centro_educativo_']);
      delete rowCloned['toma_']['curso_']['comision_']['sede_']['centro_educativo_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_'])
    ){
      this.stg.setItem('sede' + rowCloned['toma_']['curso_']['comision_']['sede_'].id, rowCloned['toma_']['curso_']['comision_']['sede_']);
      delete rowCloned['toma_']['curso_']['comision_']['sede_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('modalidad_' in rowCloned['toma_']['curso_']['comision_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['toma_']['curso_']['comision_']['modalidad_'].id, rowCloned['toma_']['curso_']['comision_']['modalidad_']);
      delete rowCloned['toma_']['curso_']['comision_']['modalidad_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('planificacion_' in rowCloned['toma_']['curso_']['comision_'])
    && ('plan_' in rowCloned['toma_']['curso_']['comision_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['toma_']['curso_']['comision_']['planificacion_']['plan_'].id, rowCloned['toma_']['curso_']['comision_']['planificacion_']['plan_']);
      delete rowCloned['toma_']['curso_']['comision_']['planificacion_']['plan_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('planificacion_' in rowCloned['toma_']['curso_']['comision_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['toma_']['curso_']['comision_']['planificacion_'].id, rowCloned['toma_']['curso_']['comision_']['planificacion_']);
      delete rowCloned['toma_']['curso_']['comision_']['planificacion_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    && ('domicilio_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    && ('tipo_sede_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_'])
    && ('domicilio_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('sede_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('sede' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['sede_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('modalidad_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['modalidad_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['modalidad_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['modalidad_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('planificacion_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    && ('plan_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('planificacion_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['planificacion_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['planificacion_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['planificacion_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    && ('calendario_' in rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('calendario' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['calendario_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['calendario_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']['calendario_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('comision_siguiente_' in rowCloned['toma_']['curso_']['comision_'])
    ){
      this.stg.setItem('comision' + rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'].id, rowCloned['toma_']['curso_']['comision_']['comision_siguiente_']);
      delete rowCloned['toma_']['curso_']['comision_']['comision_siguiente_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    && ('calendario_' in rowCloned['toma_']['curso_']['comision_'])
    ){
      this.stg.setItem('calendario' + rowCloned['toma_']['curso_']['comision_']['calendario_'].id, rowCloned['toma_']['curso_']['comision_']['calendario_']);
      delete rowCloned['toma_']['curso_']['comision_']['calendario_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('comision_' in rowCloned['toma_']['curso_'])
    ){
      this.stg.setItem('comision' + rowCloned['toma_']['curso_']['comision_'].id, rowCloned['toma_']['curso_']['comision_']);
      delete rowCloned['toma_']['curso_']['comision_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    && ('asignatura_' in rowCloned['toma_']['curso_'])
    ){
      this.stg.setItem('asignatura' + rowCloned['toma_']['curso_']['asignatura_'].id, rowCloned['toma_']['curso_']['asignatura_']);
      delete rowCloned['toma_']['curso_']['asignatura_'];
    }
    if(('toma_' in rowCloned)
    && ('curso_' in rowCloned['toma_'])
    ){
      this.stg.setItem('curso' + rowCloned['toma_']['curso_'].id, rowCloned['toma_']['curso_']);
      delete rowCloned['toma_']['curso_'];
    }
    if(('toma_' in rowCloned)
    && ('docente_' in rowCloned['toma_'])
    && ('domicilio_' in rowCloned['toma_']['docente_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['toma_']['docente_']['domicilio_'].id, rowCloned['toma_']['docente_']['domicilio_']);
      delete rowCloned['toma_']['docente_']['domicilio_'];
    }
    if(('toma_' in rowCloned)
    && ('docente_' in rowCloned['toma_'])
    ){
      this.stg.setItem('persona' + rowCloned['toma_']['docente_'].id, rowCloned['toma_']['docente_']);
      delete rowCloned['toma_']['docente_'];
    }
    if(('toma_' in rowCloned)
    && ('reemplazo_' in rowCloned['toma_'])
    && ('domicilio_' in rowCloned['toma_']['reemplazo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['toma_']['reemplazo_']['domicilio_'].id, rowCloned['toma_']['reemplazo_']['domicilio_']);
      delete rowCloned['toma_']['reemplazo_']['domicilio_'];
    }
    if(('toma_' in rowCloned)
    && ('reemplazo_' in rowCloned['toma_'])
    ){
      this.stg.setItem('persona' + rowCloned['toma_']['reemplazo_'].id, rowCloned['toma_']['reemplazo_']);
      delete rowCloned['toma_']['reemplazo_'];
    }
    if(('toma_' in rowCloned)
    ){
      this.stg.setItem('toma' + rowCloned['toma_'].id, rowCloned['toma_']);
      delete rowCloned['toma_'];
    }
    this.stg.setItem("asignacion_planilla_docente" + rowCloned.id, rowCloned);
  }

  storageAsignatura(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("asignatura" + rowCloned.id, rowCloned);
  }

  storageCalendario(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("calendario" + rowCloned.id, rowCloned);
  }

  storageCargo(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("cargo" + rowCloned.id, rowCloned);
  }

  storageCentroEducativo(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('domicilio_' in rowCloned)
    ){
      this.stg.setItem('domicilio' + rowCloned['domicilio_'].id, rowCloned['domicilio_']);
      delete rowCloned['domicilio_'];
    }
    this.stg.setItem("centro_educativo" + rowCloned.id, rowCloned);
  }

  storageComision(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('sede_' in rowCloned)
    && ('domicilio_' in rowCloned['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['sede_']['domicilio_'].id, rowCloned['sede_']['domicilio_']);
      delete rowCloned['sede_']['domicilio_'];
    }
    if(('sede_' in rowCloned)
    && ('tipo_sede_' in rowCloned['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['sede_']['tipo_sede_'].id, rowCloned['sede_']['tipo_sede_']);
      delete rowCloned['sede_']['tipo_sede_'];
    }
    if(('sede_' in rowCloned)
    && ('centro_educativo_' in rowCloned['sede_'])
    && ('domicilio_' in rowCloned['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('sede_' in rowCloned)
    && ('centro_educativo_' in rowCloned['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['sede_']['centro_educativo_'].id, rowCloned['sede_']['centro_educativo_']);
      delete rowCloned['sede_']['centro_educativo_'];
    }
    if(('sede_' in rowCloned)
    ){
      this.stg.setItem('sede' + rowCloned['sede_'].id, rowCloned['sede_']);
      delete rowCloned['sede_'];
    }
    if(('modalidad_' in rowCloned)
    ){
      this.stg.setItem('modalidad' + rowCloned['modalidad_'].id, rowCloned['modalidad_']);
      delete rowCloned['modalidad_'];
    }
    if(('planificacion_' in rowCloned)
    && ('plan_' in rowCloned['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['planificacion_']['plan_'].id, rowCloned['planificacion_']['plan_']);
      delete rowCloned['planificacion_']['plan_'];
    }
    if(('planificacion_' in rowCloned)
    ){
      this.stg.setItem('planificacion' + rowCloned['planificacion_'].id, rowCloned['planificacion_']);
      delete rowCloned['planificacion_'];
    }
    if(('calendario_' in rowCloned)
    ){
      this.stg.setItem('calendario' + rowCloned['calendario_'].id, rowCloned['calendario_']);
      delete rowCloned['calendario_'];
    }
    this.stg.setItem("comision" + rowCloned.id, rowCloned);
  }

  storageContralor(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('planilla_docente_' in rowCloned)
    ){
      this.stg.setItem('planilla_docente' + rowCloned['planilla_docente_'].id, rowCloned['planilla_docente_']);
      delete rowCloned['planilla_docente_'];
    }
    this.stg.setItem("contralor" + rowCloned.id, rowCloned);
  }

  storageCurso(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('comision_' in rowCloned)
    && ('sede_' in rowCloned['comision_'])
    && ('domicilio_' in rowCloned['comision_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['comision_']['sede_']['domicilio_'].id, rowCloned['comision_']['sede_']['domicilio_']);
      delete rowCloned['comision_']['sede_']['domicilio_'];
    }
    if(('comision_' in rowCloned)
    && ('sede_' in rowCloned['comision_'])
    && ('tipo_sede_' in rowCloned['comision_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['comision_']['sede_']['tipo_sede_'].id, rowCloned['comision_']['sede_']['tipo_sede_']);
      delete rowCloned['comision_']['sede_']['tipo_sede_'];
    }
    if(('comision_' in rowCloned)
    && ('sede_' in rowCloned['comision_'])
    && ('centro_educativo_' in rowCloned['comision_']['sede_'])
    && ('domicilio_' in rowCloned['comision_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['comision_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['comision_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['comision_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('comision_' in rowCloned)
    && ('sede_' in rowCloned['comision_'])
    && ('centro_educativo_' in rowCloned['comision_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['comision_']['sede_']['centro_educativo_'].id, rowCloned['comision_']['sede_']['centro_educativo_']);
      delete rowCloned['comision_']['sede_']['centro_educativo_'];
    }
    if(('comision_' in rowCloned)
    && ('sede_' in rowCloned['comision_'])
    ){
      this.stg.setItem('sede' + rowCloned['comision_']['sede_'].id, rowCloned['comision_']['sede_']);
      delete rowCloned['comision_']['sede_'];
    }
    if(('comision_' in rowCloned)
    && ('modalidad_' in rowCloned['comision_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['comision_']['modalidad_'].id, rowCloned['comision_']['modalidad_']);
      delete rowCloned['comision_']['modalidad_'];
    }
    if(('comision_' in rowCloned)
    && ('planificacion_' in rowCloned['comision_'])
    && ('plan_' in rowCloned['comision_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['comision_']['planificacion_']['plan_'].id, rowCloned['comision_']['planificacion_']['plan_']);
      delete rowCloned['comision_']['planificacion_']['plan_'];
    }
    if(('comision_' in rowCloned)
    && ('planificacion_' in rowCloned['comision_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['comision_']['planificacion_'].id, rowCloned['comision_']['planificacion_']);
      delete rowCloned['comision_']['planificacion_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('sede_' in rowCloned['comision_']['comision_siguiente_'])
    && ('domicilio_' in rowCloned['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['comision_']['comision_siguiente_']['sede_']['domicilio_'].id, rowCloned['comision_']['comision_siguiente_']['sede_']['domicilio_']);
      delete rowCloned['comision_']['comision_siguiente_']['sede_']['domicilio_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('sede_' in rowCloned['comision_']['comision_siguiente_'])
    && ('tipo_sede_' in rowCloned['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['comision_']['comision_siguiente_']['sede_']['tipo_sede_'].id, rowCloned['comision_']['comision_siguiente_']['sede_']['tipo_sede_']);
      delete rowCloned['comision_']['comision_siguiente_']['sede_']['tipo_sede_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('sede_' in rowCloned['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['comision_']['comision_siguiente_']['sede_'])
    && ('domicilio_' in rowCloned['comision_']['comision_siguiente_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('sede_' in rowCloned['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['comision_']['comision_siguiente_']['sede_']['centro_educativo_'].id, rowCloned['comision_']['comision_siguiente_']['sede_']['centro_educativo_']);
      delete rowCloned['comision_']['comision_siguiente_']['sede_']['centro_educativo_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('sede_' in rowCloned['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('sede' + rowCloned['comision_']['comision_siguiente_']['sede_'].id, rowCloned['comision_']['comision_siguiente_']['sede_']);
      delete rowCloned['comision_']['comision_siguiente_']['sede_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('modalidad_' in rowCloned['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['comision_']['comision_siguiente_']['modalidad_'].id, rowCloned['comision_']['comision_siguiente_']['modalidad_']);
      delete rowCloned['comision_']['comision_siguiente_']['modalidad_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('planificacion_' in rowCloned['comision_']['comision_siguiente_'])
    && ('plan_' in rowCloned['comision_']['comision_siguiente_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['comision_']['comision_siguiente_']['planificacion_']['plan_'].id, rowCloned['comision_']['comision_siguiente_']['planificacion_']['plan_']);
      delete rowCloned['comision_']['comision_siguiente_']['planificacion_']['plan_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('planificacion_' in rowCloned['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['comision_']['comision_siguiente_']['planificacion_'].id, rowCloned['comision_']['comision_siguiente_']['planificacion_']);
      delete rowCloned['comision_']['comision_siguiente_']['planificacion_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    && ('calendario_' in rowCloned['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('calendario' + rowCloned['comision_']['comision_siguiente_']['calendario_'].id, rowCloned['comision_']['comision_siguiente_']['calendario_']);
      delete rowCloned['comision_']['comision_siguiente_']['calendario_'];
    }
    if(('comision_' in rowCloned)
    && ('comision_siguiente_' in rowCloned['comision_'])
    ){
      this.stg.setItem('comision' + rowCloned['comision_']['comision_siguiente_'].id, rowCloned['comision_']['comision_siguiente_']);
      delete rowCloned['comision_']['comision_siguiente_'];
    }
    if(('comision_' in rowCloned)
    && ('calendario_' in rowCloned['comision_'])
    ){
      this.stg.setItem('calendario' + rowCloned['comision_']['calendario_'].id, rowCloned['comision_']['calendario_']);
      delete rowCloned['comision_']['calendario_'];
    }
    if(('comision_' in rowCloned)
    ){
      this.stg.setItem('comision' + rowCloned['comision_'].id, rowCloned['comision_']);
      delete rowCloned['comision_'];
    }
    if(('asignatura_' in rowCloned)
    ){
      this.stg.setItem('asignatura' + rowCloned['asignatura_'].id, rowCloned['asignatura_']);
      delete rowCloned['asignatura_'];
    }
    this.stg.setItem("curso" + rowCloned.id, rowCloned);
  }

  storageDesignacion(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('cargo_' in rowCloned)
    ){
      this.stg.setItem('cargo' + rowCloned['cargo_'].id, rowCloned['cargo_']);
      delete rowCloned['cargo_'];
    }
    if(('sede_' in rowCloned)
    && ('domicilio_' in rowCloned['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['sede_']['domicilio_'].id, rowCloned['sede_']['domicilio_']);
      delete rowCloned['sede_']['domicilio_'];
    }
    if(('sede_' in rowCloned)
    && ('tipo_sede_' in rowCloned['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['sede_']['tipo_sede_'].id, rowCloned['sede_']['tipo_sede_']);
      delete rowCloned['sede_']['tipo_sede_'];
    }
    if(('sede_' in rowCloned)
    && ('centro_educativo_' in rowCloned['sede_'])
    && ('domicilio_' in rowCloned['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('sede_' in rowCloned)
    && ('centro_educativo_' in rowCloned['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['sede_']['centro_educativo_'].id, rowCloned['sede_']['centro_educativo_']);
      delete rowCloned['sede_']['centro_educativo_'];
    }
    if(('sede_' in rowCloned)
    ){
      this.stg.setItem('sede' + rowCloned['sede_'].id, rowCloned['sede_']);
      delete rowCloned['sede_'];
    }
    if(('persona_' in rowCloned)
    && ('domicilio_' in rowCloned['persona_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['persona_']['domicilio_'].id, rowCloned['persona_']['domicilio_']);
      delete rowCloned['persona_']['domicilio_'];
    }
    if(('persona_' in rowCloned)
    ){
      this.stg.setItem('persona' + rowCloned['persona_'].id, rowCloned['persona_']);
      delete rowCloned['persona_'];
    }
    this.stg.setItem("designacion" + rowCloned.id, rowCloned);
  }

  storageDetallePersona(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('archivo_' in rowCloned)
    ){
      this.stg.setItem('file' + rowCloned['archivo_'].id, rowCloned['archivo_']);
      delete rowCloned['archivo_'];
    }
    if(('persona_' in rowCloned)
    && ('domicilio_' in rowCloned['persona_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['persona_']['domicilio_'].id, rowCloned['persona_']['domicilio_']);
      delete rowCloned['persona_']['domicilio_'];
    }
    if(('persona_' in rowCloned)
    ){
      this.stg.setItem('persona' + rowCloned['persona_'].id, rowCloned['persona_']);
      delete rowCloned['persona_'];
    }
    this.stg.setItem("detalle_persona" + rowCloned.id, rowCloned);
  }

  storageDia(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("dia" + rowCloned.id, rowCloned);
  }

  storageDistribucionHoraria(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('asignatura_' in rowCloned)
    ){
      this.stg.setItem('asignatura' + rowCloned['asignatura_'].id, rowCloned['asignatura_']);
      delete rowCloned['asignatura_'];
    }
    if(('planificacion_' in rowCloned)
    && ('plan_' in rowCloned['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['planificacion_']['plan_'].id, rowCloned['planificacion_']['plan_']);
      delete rowCloned['planificacion_']['plan_'];
    }
    if(('planificacion_' in rowCloned)
    ){
      this.stg.setItem('planificacion' + rowCloned['planificacion_'].id, rowCloned['planificacion_']);
      delete rowCloned['planificacion_'];
    }
    this.stg.setItem("distribucion_horaria" + rowCloned.id, rowCloned);
  }

  storageDomicilio(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("domicilio" + rowCloned.id, rowCloned);
  }

  storageEmail(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('persona_' in rowCloned)
    && ('domicilio_' in rowCloned['persona_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['persona_']['domicilio_'].id, rowCloned['persona_']['domicilio_']);
      delete rowCloned['persona_']['domicilio_'];
    }
    if(('persona_' in rowCloned)
    ){
      this.stg.setItem('persona' + rowCloned['persona_'].id, rowCloned['persona_']);
      delete rowCloned['persona_'];
    }
    this.stg.setItem("email" + rowCloned.id, rowCloned);
  }

  storageFile(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("file" + rowCloned.id, rowCloned);
  }

  storageHorario(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['sede_']['domicilio_'].id, rowCloned['curso_']['comision_']['sede_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['sede_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('tipo_sede_' in rowCloned['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['curso_']['comision_']['sede_']['tipo_sede_'].id, rowCloned['curso_']['comision_']['sede_']['tipo_sede_']);
      delete rowCloned['curso_']['comision_']['sede_']['tipo_sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['sede_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['curso_']['comision_']['sede_']['centro_educativo_'].id, rowCloned['curso_']['comision_']['sede_']['centro_educativo_']);
      delete rowCloned['curso_']['comision_']['sede_']['centro_educativo_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('sede' + rowCloned['curso_']['comision_']['sede_'].id, rowCloned['curso_']['comision_']['sede_']);
      delete rowCloned['curso_']['comision_']['sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('modalidad_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['curso_']['comision_']['modalidad_'].id, rowCloned['curso_']['comision_']['modalidad_']);
      delete rowCloned['curso_']['comision_']['modalidad_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('planificacion_' in rowCloned['curso_']['comision_'])
    && ('plan_' in rowCloned['curso_']['comision_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['curso_']['comision_']['planificacion_']['plan_'].id, rowCloned['curso_']['comision_']['planificacion_']['plan_']);
      delete rowCloned['curso_']['comision_']['planificacion_']['plan_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('planificacion_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['curso_']['comision_']['planificacion_'].id, rowCloned['curso_']['comision_']['planificacion_']);
      delete rowCloned['curso_']['comision_']['planificacion_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('tipo_sede_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('sede' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('modalidad_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['curso_']['comision_']['comision_siguiente_']['modalidad_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['modalidad_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['modalidad_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('planificacion_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('plan_' in rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('planificacion_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('calendario_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('calendario' + rowCloned['curso_']['comision_']['comision_siguiente_']['calendario_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['calendario_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['calendario_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('comision' + rowCloned['curso_']['comision_']['comision_siguiente_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('calendario_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('calendario' + rowCloned['curso_']['comision_']['calendario_'].id, rowCloned['curso_']['comision_']['calendario_']);
      delete rowCloned['curso_']['comision_']['calendario_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    ){
      this.stg.setItem('comision' + rowCloned['curso_']['comision_'].id, rowCloned['curso_']['comision_']);
      delete rowCloned['curso_']['comision_'];
    }
    if(('curso_' in rowCloned)
    && ('asignatura_' in rowCloned['curso_'])
    ){
      this.stg.setItem('asignatura' + rowCloned['curso_']['asignatura_'].id, rowCloned['curso_']['asignatura_']);
      delete rowCloned['curso_']['asignatura_'];
    }
    if(('curso_' in rowCloned)
    ){
      this.stg.setItem('curso' + rowCloned['curso_'].id, rowCloned['curso_']);
      delete rowCloned['curso_'];
    }
    if(('dia_' in rowCloned)
    ){
      this.stg.setItem('dia' + rowCloned['dia_'].id, rowCloned['dia_']);
      delete rowCloned['dia_'];
    }
    this.stg.setItem("horario" + rowCloned.id, rowCloned);
  }

  storageModalidad(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("modalidad" + rowCloned.id, rowCloned);
  }

  storagePersona(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('domicilio_' in rowCloned)
    ){
      this.stg.setItem('domicilio' + rowCloned['domicilio_'].id, rowCloned['domicilio_']);
      delete rowCloned['domicilio_'];
    }
    this.stg.setItem("persona" + rowCloned.id, rowCloned);
  }

  storagePlan(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("plan" + rowCloned.id, rowCloned);
  }

  storagePlanificacion(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('plan_' in rowCloned)
    ){
      this.stg.setItem('plan' + rowCloned['plan_'].id, rowCloned['plan_']);
      delete rowCloned['plan_'];
    }
    this.stg.setItem("planificacion" + rowCloned.id, rowCloned);
  }

  storagePlanillaDocente(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("planilla_docente" + rowCloned.id, rowCloned);
  }

  storageSede(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('domicilio_' in rowCloned)
    ){
      this.stg.setItem('domicilio' + rowCloned['domicilio_'].id, rowCloned['domicilio_']);
      delete rowCloned['domicilio_'];
    }
    if(('tipo_sede_' in rowCloned)
    ){
      this.stg.setItem('tipo_sede' + rowCloned['tipo_sede_'].id, rowCloned['tipo_sede_']);
      delete rowCloned['tipo_sede_'];
    }
    if(('centro_educativo_' in rowCloned)
    && ('domicilio_' in rowCloned['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['centro_educativo_']['domicilio_'].id, rowCloned['centro_educativo_']['domicilio_']);
      delete rowCloned['centro_educativo_']['domicilio_'];
    }
    if(('centro_educativo_' in rowCloned)
    ){
      this.stg.setItem('centro_educativo' + rowCloned['centro_educativo_'].id, rowCloned['centro_educativo_']);
      delete rowCloned['centro_educativo_'];
    }
    this.stg.setItem("sede" + rowCloned.id, rowCloned);
  }

  storageTelefono(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('persona_' in rowCloned)
    && ('domicilio_' in rowCloned['persona_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['persona_']['domicilio_'].id, rowCloned['persona_']['domicilio_']);
      delete rowCloned['persona_']['domicilio_'];
    }
    if(('persona_' in rowCloned)
    ){
      this.stg.setItem('persona' + rowCloned['persona_'].id, rowCloned['persona_']);
      delete rowCloned['persona_'];
    }
    this.stg.setItem("telefono" + rowCloned.id, rowCloned);
  }

  storageTipoSede(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("tipo_sede" + rowCloned.id, rowCloned);
  }

  storageToma(row: { [index: string]: any }): void{
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['sede_']['domicilio_'].id, rowCloned['curso_']['comision_']['sede_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['sede_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('tipo_sede_' in rowCloned['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['curso_']['comision_']['sede_']['tipo_sede_'].id, rowCloned['curso_']['comision_']['sede_']['tipo_sede_']);
      delete rowCloned['curso_']['comision_']['sede_']['tipo_sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['sede_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['curso_']['comision_']['sede_']['centro_educativo_'].id, rowCloned['curso_']['comision_']['sede_']['centro_educativo_']);
      delete rowCloned['curso_']['comision_']['sede_']['centro_educativo_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('sede_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('sede' + rowCloned['curso_']['comision_']['sede_'].id, rowCloned['curso_']['comision_']['sede_']);
      delete rowCloned['curso_']['comision_']['sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('modalidad_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['curso_']['comision_']['modalidad_'].id, rowCloned['curso_']['comision_']['modalidad_']);
      delete rowCloned['curso_']['comision_']['modalidad_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('planificacion_' in rowCloned['curso_']['comision_'])
    && ('plan_' in rowCloned['curso_']['comision_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['curso_']['comision_']['planificacion_']['plan_'].id, rowCloned['curso_']['comision_']['planificacion_']['plan_']);
      delete rowCloned['curso_']['comision_']['planificacion_']['plan_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('planificacion_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['curso_']['comision_']['planificacion_'].id, rowCloned['curso_']['comision_']['planificacion_']);
      delete rowCloned['curso_']['comision_']['planificacion_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('tipo_sede_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('tipo_sede' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['tipo_sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    && ('domicilio_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']['domicilio_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('centro_educativo_' in rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'])
    ){
      this.stg.setItem('centro_educativo' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']['centro_educativo_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('sede_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('sede' + rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['sede_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['sede_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('modalidad_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('modalidad' + rowCloned['curso_']['comision_']['comision_siguiente_']['modalidad_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['modalidad_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['modalidad_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('planificacion_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    && ('plan_' in rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_'])
    ){
      this.stg.setItem('plan' + rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']['plan_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('planificacion_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('planificacion' + rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['planificacion_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    && ('calendario_' in rowCloned['curso_']['comision_']['comision_siguiente_'])
    ){
      this.stg.setItem('calendario' + rowCloned['curso_']['comision_']['comision_siguiente_']['calendario_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']['calendario_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_']['calendario_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('comision_siguiente_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('comision' + rowCloned['curso_']['comision_']['comision_siguiente_'].id, rowCloned['curso_']['comision_']['comision_siguiente_']);
      delete rowCloned['curso_']['comision_']['comision_siguiente_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    && ('calendario_' in rowCloned['curso_']['comision_'])
    ){
      this.stg.setItem('calendario' + rowCloned['curso_']['comision_']['calendario_'].id, rowCloned['curso_']['comision_']['calendario_']);
      delete rowCloned['curso_']['comision_']['calendario_'];
    }
    if(('curso_' in rowCloned)
    && ('comision_' in rowCloned['curso_'])
    ){
      this.stg.setItem('comision' + rowCloned['curso_']['comision_'].id, rowCloned['curso_']['comision_']);
      delete rowCloned['curso_']['comision_'];
    }
    if(('curso_' in rowCloned)
    && ('asignatura_' in rowCloned['curso_'])
    ){
      this.stg.setItem('asignatura' + rowCloned['curso_']['asignatura_'].id, rowCloned['curso_']['asignatura_']);
      delete rowCloned['curso_']['asignatura_'];
    }
    if(('curso_' in rowCloned)
    ){
      this.stg.setItem('curso' + rowCloned['curso_'].id, rowCloned['curso_']);
      delete rowCloned['curso_'];
    }
    if(('docente_' in rowCloned)
    && ('domicilio_' in rowCloned['docente_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['docente_']['domicilio_'].id, rowCloned['docente_']['domicilio_']);
      delete rowCloned['docente_']['domicilio_'];
    }
    if(('docente_' in rowCloned)
    ){
      this.stg.setItem('persona' + rowCloned['docente_'].id, rowCloned['docente_']);
      delete rowCloned['docente_'];
    }
    if(('reemplazo_' in rowCloned)
    && ('domicilio_' in rowCloned['reemplazo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['reemplazo_']['domicilio_'].id, rowCloned['reemplazo_']['domicilio_']);
      delete rowCloned['reemplazo_']['domicilio_'];
    }
    if(('reemplazo_' in rowCloned)
    ){
      this.stg.setItem('persona' + rowCloned['reemplazo_'].id, rowCloned['reemplazo_']);
      delete rowCloned['reemplazo_'];
    }
    this.stg.setItem("toma" + rowCloned.id, rowCloned);
  }

}
