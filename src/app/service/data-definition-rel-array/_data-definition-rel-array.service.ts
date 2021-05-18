import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { isEmptyObject } from '@function/is-empty-object.function';


@Injectable({
  providedIn: 'root'
})
export class _DataDefinitionRelArrayService { //2
  /**
   * Define un array de relaciones, utilizando metodos que consultan el storage,
   * 
   * La estructura resultante, puede ser utilizada directamente en una tabla de visualizacion.
   * 
   * Gracias al storage y la identificacion de fields, 
   * reduce los accesos al servidor y facilita el ordenamiento
   * 
   * La identificacion de fields es distinta de la que hace el servidor.
   * En el servidor habitualmente se utiliza '-' para las consultas 
   * y '_' representar el resultado, 
   */

  constructor(protected dd: DataDefinitionToolService){ }

    filterFields(fields, prefix) {
      var f = {}
      for(var key in fields){
        if(fields.hasOwnProperty(key)){
          if(key.includes(prefix)) f[key] = fields[key];
        }
      }
      return f;
    }

  get(entityName: string, id:string, fields: { [index: string]: any }): Observable<any> {
      /**
       * @param fields Ejemplo de estructura, para entityName = 'alumno'
       * {'per-nombres':'nombres', 'per-numero_documento':'numero_documento', 'per_dom-calle':'calle'}
       */
    switch(entityName) {
      case "alumno": { return this.alumnoGet(id, fields); }
      case "alumno_comision": { return this.alumnoComisionGet(id, fields); }
      case "asignacion_planilla_docente": { return this.asignacionPlanillaDocenteGet(id, fields); }
      case "asignatura": { return this.asignaturaGet(id, fields); }
      case "calendario": { return this.calendarioGet(id, fields); }
      case "calificacion": { return this.calificacionGet(id, fields); }
      case "cargo": { return this.cargoGet(id, fields); }
      case "centro_educativo": { return this.centroEducativoGet(id, fields); }
      case "comision": { return this.comisionGet(id, fields); }
      case "comision_relacionada": { return this.comisionRelacionadaGet(id, fields); }
      case "contralor": { return this.contralorGet(id, fields); }
      case "curso": { return this.cursoGet(id, fields); }
      case "designacion": { return this.designacionGet(id, fields); }
      case "detalle_persona": { return this.detallePersonaGet(id, fields); }
      case "dia": { return this.diaGet(id, fields); }
      case "distribucion_horaria": { return this.distribucionHorariaGet(id, fields); }
      case "domicilio": { return this.domicilioGet(id, fields); }
      case "email": { return this.emailGet(id, fields); }
      case "file": { return this.fileGet(id, fields); }
      case "horario": { return this.horarioGet(id, fields); }
      case "modalidad": { return this.modalidadGet(id, fields); }
      case "persona": { return this.personaGet(id, fields); }
      case "plan": { return this.planGet(id, fields); }
      case "planificacion": { return this.planificacionGet(id, fields); }
      case "planilla_docente": { return this.planillaDocenteGet(id, fields); }
      case "sede": { return this.sedeGet(id, fields); }
      case "telefono": { return this.telefonoGet(id, fields); }
      case "tipo_sede": { return this.tipoSedeGet(id, fields); }
      case "toma": { return this.tomaGet(id, fields); }
    }
  }
  getAll(entityName: string, ids:string[], fields: { [index: string]: any }): Observable<any> {
      /**
       * @param fields Ejemplo de estructura, para entityName = 'alumno'
       * {'per-nombres':'nombres', 'per-numero_documento':'numero_documento', 'per_dom-calle':'calle'}
       */
    switch(entityName) {
      case "alumno": { return this.alumnoGetAll(ids, fields); }
      case "alumno_comision": { return this.alumnoComisionGetAll(ids, fields); }
      case "asignacion_planilla_docente": { return this.asignacionPlanillaDocenteGetAll(ids, fields); }
      case "asignatura": { return this.asignaturaGetAll(ids, fields); }
      case "calendario": { return this.calendarioGetAll(ids, fields); }
      case "calificacion": { return this.calificacionGetAll(ids, fields); }
      case "cargo": { return this.cargoGetAll(ids, fields); }
      case "centro_educativo": { return this.centroEducativoGetAll(ids, fields); }
      case "comision": { return this.comisionGetAll(ids, fields); }
      case "comision_relacionada": { return this.comisionRelacionadaGetAll(ids, fields); }
      case "contralor": { return this.contralorGetAll(ids, fields); }
      case "curso": { return this.cursoGetAll(ids, fields); }
      case "designacion": { return this.designacionGetAll(ids, fields); }
      case "detalle_persona": { return this.detallePersonaGetAll(ids, fields); }
      case "dia": { return this.diaGetAll(ids, fields); }
      case "distribucion_horaria": { return this.distribucionHorariaGetAll(ids, fields); }
      case "domicilio": { return this.domicilioGetAll(ids, fields); }
      case "email": { return this.emailGetAll(ids, fields); }
      case "file": { return this.fileGetAll(ids, fields); }
      case "horario": { return this.horarioGetAll(ids, fields); }
      case "modalidad": { return this.modalidadGetAll(ids, fields); }
      case "persona": { return this.personaGetAll(ids, fields); }
      case "plan": { return this.planGetAll(ids, fields); }
      case "planificacion": { return this.planificacionGetAll(ids, fields); }
      case "planilla_docente": { return this.planillaDocenteGetAll(ids, fields); }
      case "sede": { return this.sedeGetAll(ids, fields); }
      case "telefono": { return this.telefonoGetAll(ids, fields); }
      case "tipo_sede": { return this.tipoSedeGetAll(ids, fields); }
      case "toma": { return this.tomaGetAll(ids, fields); }
    }
  }
  alumnoGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("alumno", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  alumnoComisionGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("alumno_comision", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-calendario', 'calendario', f)
        }
      ),
    )
  }
    
  asignacionPlanillaDocenteGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("asignacion_planilla_docente", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'planilla_docente', 'planilla_docente', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'toma', 'toma', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom-curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_doc-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom-docente', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_doc_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_doc-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_ree-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom-reemplazo', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_ree_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom_ree-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tom-planilla_docente', 'planilla_docente', f)
        }
      ),
    )
  }
    
  asignaturaGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("asignatura", ids)  }
    
  calendarioGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("calendario", ids)  }
    
  calificacionGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("calificacion", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'pla-plan', 'plan', f)
        }
      ),
    )
  }
    
  cargoGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("cargo", ids)  }
    
  centroEducativoGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("centro_educativo", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  comisionGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("comision", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'calendario', 'calendario', f)
        }
      ),
    )
  }
    
  comisionRelacionadaGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("comision_relacionada", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'relacion', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'rel-calendario', 'calendario', f)
        }
      ),
    )
  }
    
  contralorGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("contralor", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'planilla_docente', 'planilla_docente', f)
        }
      ),
    )
  }
    
  cursoGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("curso", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'asignatura', 'asignatura', f)
        }
      ),
    )
  }
    
  designacionGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("designacion", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'car-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cargo', 'cargo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  detallePersonaGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("detalle_persona", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'arc-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'archivo', 'file', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  diaGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("dia", ids)  }
    
  distribucionHorariaGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("distribucion_horaria", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'pla-plan', 'plan', f)
        }
      ),
    )
  }
    
  domicilioGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("domicilio", ids)  }
    
  emailGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("email", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  fileGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("file", ids)  }
    
  horarioGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("horario", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dia-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'dia', 'dia', f)
        }
      ),
    )
  }
    
  modalidadGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("modalidad", ids)  }
    
  personaGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("persona", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  planGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("plan", ids)  }
    
  planificacionGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("planificacion", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'plan', 'plan', f)
        }
      ),
    )
  }
    
  planillaDocenteGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("planilla_docente", ids)  }
    
  sedeGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("sede", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'ce-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  telefonoGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("telefono", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  tipoSedeGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("tipo_sede", ids)  }
    
  tomaGetAll(ids: string[], fields: { [index: string]: any }): Observable<any> {
    return this.dd.getAll("toma", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'doc-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'docente', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'doc_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'doc-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ree-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'reemplazo', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ree_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'ree-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getAllColumnData(data, 'planilla_docente', 'planilla_docente', f)
        }
      ),
    )
  }
    
  alumnoGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("alumno", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  alumnoComisionGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("alumno_comision", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-calendario', 'calendario', f)
        }
      ),
    )
  }
    
  asignacionPlanillaDocenteGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("asignacion_planilla_docente", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'planilla_docente', 'planilla_docente', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'toma', 'toma', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom-curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_doc-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom-docente', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_doc_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_doc-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_ree-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom-reemplazo', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_ree_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom_ree-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'tom_pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tom-planilla_docente', 'planilla_docente', f)
        }
      ),
    )
  }
    
  asignaturaGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("asignatura", id)  }
    
  calendarioGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("calendario", id)  }
    
  calificacionGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("calificacion", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'pla-plan', 'plan', f)
        }
      ),
    )
  }
    
  cargoGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("cargo", id)  }
    
  centroEducativoGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("centro_educativo", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  comisionGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("comision", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'calendario', 'calendario', f)
        }
      ),
    )
  }
    
  comisionRelacionadaGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("comision_relacionada", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'relacion', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'rel_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'rel-calendario', 'calendario', f)
        }
      ),
    )
  }
    
  contralorGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("contralor", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'planilla_docente', 'planilla_docente', f)
        }
      ),
    )
  }
    
  cursoGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("curso", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'asignatura', 'asignatura', f)
        }
      ),
    )
  }
    
  designacionGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("designacion", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'car-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cargo', 'cargo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  detallePersonaGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("detalle_persona", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'arc-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'archivo', 'file', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  diaGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("dia", id)  }
    
  distribucionHorariaGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("distribucion_horaria", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'pla-plan', 'plan', f)
        }
      ),
    )
  }
    
  domicilioGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("domicilio", id)  }
    
  emailGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("email", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  fileGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("file", id)  }
    
  horarioGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("horario", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dia-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'dia', 'dia', f)
        }
      ),
    )
  }
    
  modalidadGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("modalidad", id)  }
    
  personaGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("persona", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  planGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("plan", id)  }
    
  planificacionGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("planificacion", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'plan', 'plan', f)
        }
      ),
    )
  }
    
  planillaDocenteGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("planilla_docente", id)  }
    
  sedeGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("sede", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'ce-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  telefonoGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("telefono", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'persona', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'per_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'per-domicilio', 'domicilio', f)
        }
      ),
    )
  }
    
  tipoSedeGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("tipo_sede", id)  }
    
  tomaGet(id: string, fields: { [index: string]: any }): Observable<any> {
    return this.dd.get("toma", id).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'curso', 'curso', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur-comision', 'comision', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-sede', 'sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ts-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_sed_ce_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_moa-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-modalidad', 'modalidad', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-planificacion', 'planificacion', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_pla_plb-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com_pla-plan', 'plan', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_com_cal-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur_com-calendario', 'calendario', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'cur_asi-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'cur-asignatura', 'asignatura', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'doc-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'docente', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'doc_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'doc-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ree-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'reemplazo', 'persona', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'ree_dom-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'ree-domicilio', 'domicilio', f)
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          var f = this.filterFields(fields, 'pd-');
          return (isEmptyObject(f)) ? of(data) : this.dd.getColumnData(data, 'planilla_docente', 'planilla_docente', f)
        }
      ),
    )
  }
    
}
