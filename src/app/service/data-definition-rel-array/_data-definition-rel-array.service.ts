import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';

@Injectable({
  providedIn: 'root'
})
export class _DataDefinitionRelArrayService {
  /**
   * Define un array de relaciones, 
   * utilizando metodos que consultan el storage,
   * para reducir las consultas al servidor.
   * La estructura resultante, puede ser utilizada directamente 
   * en una tabla de visualizacion, facilitando el ordenamiento,
   * ya que cada campo se identifica con el prefijo correspondiente
   * de la entidad relacionada
   */

  constructor(protected dd: DataDefinitionToolService){ }

  main(entityName: string, ids:string[]): Observable<string> {
    switch(entityName) {
      case "alumno": { return this.alumno(ids); }
      case "asignacion_planilla_docente": { return this.asignacionPlanillaDocente(ids); }
      case "asignatura": { return this.asignatura(ids); }
      case "calendario": { return this.calendario(ids); }
      case "calificacion": { return this.calificacion(ids); }
      case "cargo": { return this.cargo(ids); }
      case "centro_educativo": { return this.centroEducativo(ids); }
      case "comision": { return this.comision(ids); }
      case "contralor": { return this.contralor(ids); }
      case "curso": { return this.curso(ids); }
      case "designacion": { return this.designacion(ids); }
      case "detalle_persona": { return this.detallePersona(ids); }
      case "dia": { return this.dia(ids); }
      case "distribucion_horaria": { return this.distribucionHoraria(ids); }
      case "domicilio": { return this.domicilio(ids); }
      case "email": { return this.email(ids); }
      case "file": { return this.file(ids); }
      case "horario": { return this.horario(ids); }
      case "modalidad": { return this.modalidad(ids); }
      case "persona": { return this.persona(ids); }
      case "plan": { return this.plan(ids); }
      case "planificacion": { return this.planificacion(ids); }
      case "planilla_docente": { return this.planillaDocente(ids); }
      case "sede": { return this.sede(ids); }
      case "telefono": { return this.telefono(ids); }
      case "tipo_sede": { return this.tipoSede(ids); }
      case "toma": { return this.toma(ids); }
    }
  }
  alumno(ids: string[]): Observable<any> {
    return this.dd.getAll("alumno", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'persona', 'persona', {'per-id':'id', 'per-nombres':'nombres', 'per-apellidos':'apellidos', 'per-fecha_nacimiento':'fecha_nacimiento', 'per-numero_documento':'numero_documento', 'per-cuil':'cuil', 'per-genero':'genero', 'per-apodo':'apodo', 'per-telefono':'telefono', 'per-email':'email', 'per-email_abc':'email_abc', 'per-alta':'alta', 'per-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', {'per_dom-id':'id', 'per_dom-calle':'calle', 'per_dom-entre':'entre', 'per_dom-numero':'numero', 'per_dom-piso':'piso', 'per_dom-departamento':'departamento', 'per_dom-barrio':'barrio', 'per_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'comision', 'comision', {'com-id':'id', 'com-turno':'turno', 'com-division':'division', 'com-comentario':'comentario', 'com-autorizada':'autorizada', 'com-apertura':'apertura', 'com-publicada':'publicada', 'com-observaciones':'observaciones', 'com-alta':'alta', 'com-identificacion':'identificacion', 'com-estado':'estado', 'com-configuracion':'configuracion', 'com-sede':'sede', 'com-modalidad':'modalidad', 'com-planificacion':'planificacion', 'com-comision_siguiente':'comision_siguiente', 'com-calendario':'calendario', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-sede', 'sede', {'com_sed-id':'id', 'com_sed-numero':'numero', 'com_sed-nombre':'nombre', 'com_sed-observaciones':'observaciones', 'com_sed-alta':'alta', 'com_sed-baja':'baja', 'com_sed-fecha_traspaso':'fecha_traspaso', 'com_sed-domicilio':'domicilio', 'com_sed-tipo_sede':'tipo_sede', 'com_sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed-domicilio', 'domicilio', {'com_sed_dom-id':'id', 'com_sed_dom-calle':'calle', 'com_sed_dom-entre':'entre', 'com_sed_dom-numero':'numero', 'com_sed_dom-piso':'piso', 'com_sed_dom-departamento':'departamento', 'com_sed_dom-barrio':'barrio', 'com_sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', {'com_sed_ts-id':'id', 'com_sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', {'com_sed_ce-id':'id', 'com_sed_ce-nombre':'nombre', 'com_sed_ce-cue':'cue', 'com_sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed_ce-domicilio', 'domicilio', {'com_sed_ce_dom-id':'id', 'com_sed_ce_dom-calle':'calle', 'com_sed_ce_dom-entre':'entre', 'com_sed_ce_dom-numero':'numero', 'com_sed_ce_dom-piso':'piso', 'com_sed_ce_dom-departamento':'departamento', 'com_sed_ce_dom-barrio':'barrio', 'com_sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-modalidad', 'modalidad', {'com_moa-id':'id', 'com_moa-nombre':'nombre', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-planificacion', 'planificacion', {'com_pla-id':'id', 'com_pla-anio':'anio', 'com_pla-semestre':'semestre', 'com_pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_pla-plan', 'plan', {'com_pla_plb-id':'id', 'com_pla_plb-orientacion':'orientacion', 'com_pla_plb-resolucion':'resolucion', 'com_pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-calendario', 'calendario', {'com_cal-id':'id', 'com_cal-inicio':'inicio', 'com_cal-fin':'fin', 'com_cal-anio':'anio', 'com_cal-semestre':'semestre', 'com_cal-insertado':'insertado', })
        }
      ),
    )
  }
    
  asignacionPlanillaDocente(ids: string[]): Observable<any> {
    return this.dd.getAll("asignacion_planilla_docente", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'planilla_docente', 'planilla_docente', {'pd-id':'id', 'pd-numero':'numero', 'pd-insertado':'insertado', 'pd-fecha_contralor':'fecha_contralor', 'pd-fecha_consejo':'fecha_consejo', 'pd-observaciones':'observaciones', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'toma', 'toma', {'tom-id':'id', 'tom-fecha_toma':'fecha_toma', 'tom-estado':'estado', 'tom-observaciones':'observaciones', 'tom-comentario':'comentario', 'tom-tipo_movimiento':'tipo_movimiento', 'tom-estado_contralor':'estado_contralor', 'tom-alta':'alta', 'tom-calificacion':'calificacion', 'tom-temas_tratados':'temas_tratados', 'tom-asistencia':'asistencia', 'tom-sin_planillas':'sin_planillas', 'tom-curso':'curso', 'tom-docente':'docente', 'tom-reemplazo':'reemplazo', 'tom-planilla_docente':'planilla_docente', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom-curso', 'curso', {'tom_cur-id':'id', 'tom_cur-horas_catedra':'horas_catedra', 'tom_cur-ige':'ige', 'tom_cur-alta':'alta', 'tom_cur-comision':'comision', 'tom_cur-asignatura':'asignatura', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur-comision', 'comision', {'tom_cur_com-id':'id', 'tom_cur_com-turno':'turno', 'tom_cur_com-division':'division', 'tom_cur_com-comentario':'comentario', 'tom_cur_com-autorizada':'autorizada', 'tom_cur_com-apertura':'apertura', 'tom_cur_com-publicada':'publicada', 'tom_cur_com-observaciones':'observaciones', 'tom_cur_com-alta':'alta', 'tom_cur_com-identificacion':'identificacion', 'tom_cur_com-estado':'estado', 'tom_cur_com-configuracion':'configuracion', 'tom_cur_com-sede':'sede', 'tom_cur_com-modalidad':'modalidad', 'tom_cur_com-planificacion':'planificacion', 'tom_cur_com-comision_siguiente':'comision_siguiente', 'tom_cur_com-calendario':'calendario', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com-sede', 'sede', {'tom_cur_com_sed-id':'id', 'tom_cur_com_sed-numero':'numero', 'tom_cur_com_sed-nombre':'nombre', 'tom_cur_com_sed-observaciones':'observaciones', 'tom_cur_com_sed-alta':'alta', 'tom_cur_com_sed-baja':'baja', 'tom_cur_com_sed-fecha_traspaso':'fecha_traspaso', 'tom_cur_com_sed-domicilio':'domicilio', 'tom_cur_com_sed-tipo_sede':'tipo_sede', 'tom_cur_com_sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com_sed-domicilio', 'domicilio', {'tom_cur_com_sed_dom-id':'id', 'tom_cur_com_sed_dom-calle':'calle', 'tom_cur_com_sed_dom-entre':'entre', 'tom_cur_com_sed_dom-numero':'numero', 'tom_cur_com_sed_dom-piso':'piso', 'tom_cur_com_sed_dom-departamento':'departamento', 'tom_cur_com_sed_dom-barrio':'barrio', 'tom_cur_com_sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com_sed-tipo_sede', 'tipo_sede', {'tom_cur_com_sed_ts-id':'id', 'tom_cur_com_sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com_sed-centro_educativo', 'centro_educativo', {'tom_cur_com_sed_ce-id':'id', 'tom_cur_com_sed_ce-nombre':'nombre', 'tom_cur_com_sed_ce-cue':'cue', 'tom_cur_com_sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com_sed_ce-domicilio', 'domicilio', {'tom_cur_com_sed_ce_dom-id':'id', 'tom_cur_com_sed_ce_dom-calle':'calle', 'tom_cur_com_sed_ce_dom-entre':'entre', 'tom_cur_com_sed_ce_dom-numero':'numero', 'tom_cur_com_sed_ce_dom-piso':'piso', 'tom_cur_com_sed_ce_dom-departamento':'departamento', 'tom_cur_com_sed_ce_dom-barrio':'barrio', 'tom_cur_com_sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com-modalidad', 'modalidad', {'tom_cur_com_moa-id':'id', 'tom_cur_com_moa-nombre':'nombre', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com-planificacion', 'planificacion', {'tom_cur_com_pla-id':'id', 'tom_cur_com_pla-anio':'anio', 'tom_cur_com_pla-semestre':'semestre', 'tom_cur_com_pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com_pla-plan', 'plan', {'tom_cur_com_pla_plb-id':'id', 'tom_cur_com_pla_plb-orientacion':'orientacion', 'tom_cur_com_pla_plb-resolucion':'resolucion', 'tom_cur_com_pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur_com-calendario', 'calendario', {'tom_cur_com_cal-id':'id', 'tom_cur_com_cal-inicio':'inicio', 'tom_cur_com_cal-fin':'fin', 'tom_cur_com_cal-anio':'anio', 'tom_cur_com_cal-semestre':'semestre', 'tom_cur_com_cal-insertado':'insertado', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_cur-asignatura', 'asignatura', {'tom_cur_asi-id':'id', 'tom_cur_asi-nombre':'nombre', 'tom_cur_asi-formacion':'formacion', 'tom_cur_asi-clasificacion':'clasificacion', 'tom_cur_asi-codigo':'codigo', 'tom_cur_asi-perfil':'perfil', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom-docente', 'persona', {'tom_doc-id':'id', 'tom_doc-nombres':'nombres', 'tom_doc-apellidos':'apellidos', 'tom_doc-fecha_nacimiento':'fecha_nacimiento', 'tom_doc-numero_documento':'numero_documento', 'tom_doc-cuil':'cuil', 'tom_doc-genero':'genero', 'tom_doc-apodo':'apodo', 'tom_doc-telefono':'telefono', 'tom_doc-email':'email', 'tom_doc-email_abc':'email_abc', 'tom_doc-alta':'alta', 'tom_doc-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_doc-domicilio', 'domicilio', {'tom_doc_dom-id':'id', 'tom_doc_dom-calle':'calle', 'tom_doc_dom-entre':'entre', 'tom_doc_dom-numero':'numero', 'tom_doc_dom-piso':'piso', 'tom_doc_dom-departamento':'departamento', 'tom_doc_dom-barrio':'barrio', 'tom_doc_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom-reemplazo', 'persona', {'tom_ree-id':'id', 'tom_ree-nombres':'nombres', 'tom_ree-apellidos':'apellidos', 'tom_ree-fecha_nacimiento':'fecha_nacimiento', 'tom_ree-numero_documento':'numero_documento', 'tom_ree-cuil':'cuil', 'tom_ree-genero':'genero', 'tom_ree-apodo':'apodo', 'tom_ree-telefono':'telefono', 'tom_ree-email':'email', 'tom_ree-email_abc':'email_abc', 'tom_ree-alta':'alta', 'tom_ree-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom_ree-domicilio', 'domicilio', {'tom_ree_dom-id':'id', 'tom_ree_dom-calle':'calle', 'tom_ree_dom-entre':'entre', 'tom_ree_dom-numero':'numero', 'tom_ree_dom-piso':'piso', 'tom_ree_dom-departamento':'departamento', 'tom_ree_dom-barrio':'barrio', 'tom_ree_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tom-planilla_docente', 'planilla_docente', {'tom_pd-id':'id', 'tom_pd-numero':'numero', 'tom_pd-insertado':'insertado', 'tom_pd-fecha_contralor':'fecha_contralor', 'tom_pd-fecha_consejo':'fecha_consejo', 'tom_pd-observaciones':'observaciones', })
        }
      ),
    )
  }
    
  asignatura(ids: string[]): Observable<any> {
    return this.dd.getAll("asignatura", ids)  }
    
  calendario(ids: string[]): Observable<any> {
    return this.dd.getAll("calendario", ids)  }
    
  calificacion(ids: string[]): Observable<any> {
    return this.dd.getAll("calificacion", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'curso', 'curso', {'cur-id':'id', 'cur-horas_catedra':'horas_catedra', 'cur-ige':'ige', 'cur-alta':'alta', 'cur-comision':'comision', 'cur-asignatura':'asignatura', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur-comision', 'comision', {'cur_com-id':'id', 'cur_com-turno':'turno', 'cur_com-division':'division', 'cur_com-comentario':'comentario', 'cur_com-autorizada':'autorizada', 'cur_com-apertura':'apertura', 'cur_com-publicada':'publicada', 'cur_com-observaciones':'observaciones', 'cur_com-alta':'alta', 'cur_com-identificacion':'identificacion', 'cur_com-estado':'estado', 'cur_com-configuracion':'configuracion', 'cur_com-sede':'sede', 'cur_com-modalidad':'modalidad', 'cur_com-planificacion':'planificacion', 'cur_com-comision_siguiente':'comision_siguiente', 'cur_com-calendario':'calendario', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-sede', 'sede', {'cur_com_sed-id':'id', 'cur_com_sed-numero':'numero', 'cur_com_sed-nombre':'nombre', 'cur_com_sed-observaciones':'observaciones', 'cur_com_sed-alta':'alta', 'cur_com_sed-baja':'baja', 'cur_com_sed-fecha_traspaso':'fecha_traspaso', 'cur_com_sed-domicilio':'domicilio', 'cur_com_sed-tipo_sede':'tipo_sede', 'cur_com_sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-domicilio', 'domicilio', {'cur_com_sed_dom-id':'id', 'cur_com_sed_dom-calle':'calle', 'cur_com_sed_dom-entre':'entre', 'cur_com_sed_dom-numero':'numero', 'cur_com_sed_dom-piso':'piso', 'cur_com_sed_dom-departamento':'departamento', 'cur_com_sed_dom-barrio':'barrio', 'cur_com_sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', {'cur_com_sed_ts-id':'id', 'cur_com_sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', {'cur_com_sed_ce-id':'id', 'cur_com_sed_ce-nombre':'nombre', 'cur_com_sed_ce-cue':'cue', 'cur_com_sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', {'cur_com_sed_ce_dom-id':'id', 'cur_com_sed_ce_dom-calle':'calle', 'cur_com_sed_ce_dom-entre':'entre', 'cur_com_sed_ce_dom-numero':'numero', 'cur_com_sed_ce_dom-piso':'piso', 'cur_com_sed_ce_dom-departamento':'departamento', 'cur_com_sed_ce_dom-barrio':'barrio', 'cur_com_sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-modalidad', 'modalidad', {'cur_com_moa-id':'id', 'cur_com_moa-nombre':'nombre', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-planificacion', 'planificacion', {'cur_com_pla-id':'id', 'cur_com_pla-anio':'anio', 'cur_com_pla-semestre':'semestre', 'cur_com_pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_pla-plan', 'plan', {'cur_com_pla_plb-id':'id', 'cur_com_pla_plb-orientacion':'orientacion', 'cur_com_pla_plb-resolucion':'resolucion', 'cur_com_pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-calendario', 'calendario', {'cur_com_cal-id':'id', 'cur_com_cal-inicio':'inicio', 'cur_com_cal-fin':'fin', 'cur_com_cal-anio':'anio', 'cur_com_cal-semestre':'semestre', 'cur_com_cal-insertado':'insertado', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur-asignatura', 'asignatura', {'cur_asi-id':'id', 'cur_asi-nombre':'nombre', 'cur_asi-formacion':'formacion', 'cur_asi-clasificacion':'clasificacion', 'cur_asi-codigo':'codigo', 'cur_asi-perfil':'perfil', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'persona', 'persona', {'per-id':'id', 'per-nombres':'nombres', 'per-apellidos':'apellidos', 'per-fecha_nacimiento':'fecha_nacimiento', 'per-numero_documento':'numero_documento', 'per-cuil':'cuil', 'per-genero':'genero', 'per-apodo':'apodo', 'per-telefono':'telefono', 'per-email':'email', 'per-email_abc':'email_abc', 'per-alta':'alta', 'per-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', {'per_dom-id':'id', 'per_dom-calle':'calle', 'per_dom-entre':'entre', 'per_dom-numero':'numero', 'per_dom-piso':'piso', 'per_dom-departamento':'departamento', 'per_dom-barrio':'barrio', 'per_dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  cargo(ids: string[]): Observable<any> {
    return this.dd.getAll("cargo", ids)  }
    
  centroEducativo(ids: string[]): Observable<any> {
    return this.dd.getAll("centro_educativo", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'domicilio', 'domicilio', {'dom-id':'id', 'dom-calle':'calle', 'dom-entre':'entre', 'dom-numero':'numero', 'dom-piso':'piso', 'dom-departamento':'departamento', 'dom-barrio':'barrio', 'dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  comision(ids: string[]): Observable<any> {
    return this.dd.getAll("comision", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sede', 'sede', {'sed-id':'id', 'sed-numero':'numero', 'sed-nombre':'nombre', 'sed-observaciones':'observaciones', 'sed-alta':'alta', 'sed-baja':'baja', 'sed-fecha_traspaso':'fecha_traspaso', 'sed-domicilio':'domicilio', 'sed-tipo_sede':'tipo_sede', 'sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed-domicilio', 'domicilio', {'sed_dom-id':'id', 'sed_dom-calle':'calle', 'sed_dom-entre':'entre', 'sed_dom-numero':'numero', 'sed_dom-piso':'piso', 'sed_dom-departamento':'departamento', 'sed_dom-barrio':'barrio', 'sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed-tipo_sede', 'tipo_sede', {'sed_ts-id':'id', 'sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed-centro_educativo', 'centro_educativo', {'sed_ce-id':'id', 'sed_ce-nombre':'nombre', 'sed_ce-cue':'cue', 'sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed_ce-domicilio', 'domicilio', {'sed_ce_dom-id':'id', 'sed_ce_dom-calle':'calle', 'sed_ce_dom-entre':'entre', 'sed_ce_dom-numero':'numero', 'sed_ce_dom-piso':'piso', 'sed_ce_dom-departamento':'departamento', 'sed_ce_dom-barrio':'barrio', 'sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'modalidad', 'modalidad', {'moa-id':'id', 'moa-nombre':'nombre', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'planificacion', 'planificacion', {'pla-id':'id', 'pla-anio':'anio', 'pla-semestre':'semestre', 'pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'pla-plan', 'plan', {'pla_plb-id':'id', 'pla_plb-orientacion':'orientacion', 'pla_plb-resolucion':'resolucion', 'pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'calendario', 'calendario', {'cal-id':'id', 'cal-inicio':'inicio', 'cal-fin':'fin', 'cal-anio':'anio', 'cal-semestre':'semestre', 'cal-insertado':'insertado', })
        }
      ),
    )
  }
    
  contralor(ids: string[]): Observable<any> {
    return this.dd.getAll("contralor", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'planilla_docente', 'planilla_docente', {'pd-id':'id', 'pd-numero':'numero', 'pd-insertado':'insertado', 'pd-fecha_contralor':'fecha_contralor', 'pd-fecha_consejo':'fecha_consejo', 'pd-observaciones':'observaciones', })
        }
      ),
    )
  }
    
  curso(ids: string[]): Observable<any> {
    return this.dd.getAll("curso", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'comision', 'comision', {'com-id':'id', 'com-turno':'turno', 'com-division':'division', 'com-comentario':'comentario', 'com-autorizada':'autorizada', 'com-apertura':'apertura', 'com-publicada':'publicada', 'com-observaciones':'observaciones', 'com-alta':'alta', 'com-identificacion':'identificacion', 'com-estado':'estado', 'com-configuracion':'configuracion', 'com-sede':'sede', 'com-modalidad':'modalidad', 'com-planificacion':'planificacion', 'com-comision_siguiente':'comision_siguiente', 'com-calendario':'calendario', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-sede', 'sede', {'com_sed-id':'id', 'com_sed-numero':'numero', 'com_sed-nombre':'nombre', 'com_sed-observaciones':'observaciones', 'com_sed-alta':'alta', 'com_sed-baja':'baja', 'com_sed-fecha_traspaso':'fecha_traspaso', 'com_sed-domicilio':'domicilio', 'com_sed-tipo_sede':'tipo_sede', 'com_sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed-domicilio', 'domicilio', {'com_sed_dom-id':'id', 'com_sed_dom-calle':'calle', 'com_sed_dom-entre':'entre', 'com_sed_dom-numero':'numero', 'com_sed_dom-piso':'piso', 'com_sed_dom-departamento':'departamento', 'com_sed_dom-barrio':'barrio', 'com_sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed-tipo_sede', 'tipo_sede', {'com_sed_ts-id':'id', 'com_sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed-centro_educativo', 'centro_educativo', {'com_sed_ce-id':'id', 'com_sed_ce-nombre':'nombre', 'com_sed_ce-cue':'cue', 'com_sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_sed_ce-domicilio', 'domicilio', {'com_sed_ce_dom-id':'id', 'com_sed_ce_dom-calle':'calle', 'com_sed_ce_dom-entre':'entre', 'com_sed_ce_dom-numero':'numero', 'com_sed_ce_dom-piso':'piso', 'com_sed_ce_dom-departamento':'departamento', 'com_sed_ce_dom-barrio':'barrio', 'com_sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-modalidad', 'modalidad', {'com_moa-id':'id', 'com_moa-nombre':'nombre', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-planificacion', 'planificacion', {'com_pla-id':'id', 'com_pla-anio':'anio', 'com_pla-semestre':'semestre', 'com_pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com_pla-plan', 'plan', {'com_pla_plb-id':'id', 'com_pla_plb-orientacion':'orientacion', 'com_pla_plb-resolucion':'resolucion', 'com_pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'com-calendario', 'calendario', {'com_cal-id':'id', 'com_cal-inicio':'inicio', 'com_cal-fin':'fin', 'com_cal-anio':'anio', 'com_cal-semestre':'semestre', 'com_cal-insertado':'insertado', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'asignatura', 'asignatura', {'asi-id':'id', 'asi-nombre':'nombre', 'asi-formacion':'formacion', 'asi-clasificacion':'clasificacion', 'asi-codigo':'codigo', 'asi-perfil':'perfil', })
        }
      ),
    )
  }
    
  designacion(ids: string[]): Observable<any> {
    return this.dd.getAll("designacion", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cargo', 'cargo', {'car-id':'id', 'car-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sede', 'sede', {'sed-id':'id', 'sed-numero':'numero', 'sed-nombre':'nombre', 'sed-observaciones':'observaciones', 'sed-alta':'alta', 'sed-baja':'baja', 'sed-fecha_traspaso':'fecha_traspaso', 'sed-domicilio':'domicilio', 'sed-tipo_sede':'tipo_sede', 'sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed-domicilio', 'domicilio', {'sed_dom-id':'id', 'sed_dom-calle':'calle', 'sed_dom-entre':'entre', 'sed_dom-numero':'numero', 'sed_dom-piso':'piso', 'sed_dom-departamento':'departamento', 'sed_dom-barrio':'barrio', 'sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed-tipo_sede', 'tipo_sede', {'sed_ts-id':'id', 'sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed-centro_educativo', 'centro_educativo', {'sed_ce-id':'id', 'sed_ce-nombre':'nombre', 'sed_ce-cue':'cue', 'sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'sed_ce-domicilio', 'domicilio', {'sed_ce_dom-id':'id', 'sed_ce_dom-calle':'calle', 'sed_ce_dom-entre':'entre', 'sed_ce_dom-numero':'numero', 'sed_ce_dom-piso':'piso', 'sed_ce_dom-departamento':'departamento', 'sed_ce_dom-barrio':'barrio', 'sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'persona', 'persona', {'per-id':'id', 'per-nombres':'nombres', 'per-apellidos':'apellidos', 'per-fecha_nacimiento':'fecha_nacimiento', 'per-numero_documento':'numero_documento', 'per-cuil':'cuil', 'per-genero':'genero', 'per-apodo':'apodo', 'per-telefono':'telefono', 'per-email':'email', 'per-email_abc':'email_abc', 'per-alta':'alta', 'per-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', {'per_dom-id':'id', 'per_dom-calle':'calle', 'per_dom-entre':'entre', 'per_dom-numero':'numero', 'per_dom-piso':'piso', 'per_dom-departamento':'departamento', 'per_dom-barrio':'barrio', 'per_dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  detallePersona(ids: string[]): Observable<any> {
    return this.dd.getAll("detalle_persona", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'archivo', 'file', {'arc-id':'id', 'arc-name':'name', 'arc-type':'type', 'arc-content':'content', 'arc-size':'size', 'arc-created':'created', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'persona', 'persona', {'per-id':'id', 'per-nombres':'nombres', 'per-apellidos':'apellidos', 'per-fecha_nacimiento':'fecha_nacimiento', 'per-numero_documento':'numero_documento', 'per-cuil':'cuil', 'per-genero':'genero', 'per-apodo':'apodo', 'per-telefono':'telefono', 'per-email':'email', 'per-email_abc':'email_abc', 'per-alta':'alta', 'per-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', {'per_dom-id':'id', 'per_dom-calle':'calle', 'per_dom-entre':'entre', 'per_dom-numero':'numero', 'per_dom-piso':'piso', 'per_dom-departamento':'departamento', 'per_dom-barrio':'barrio', 'per_dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  dia(ids: string[]): Observable<any> {
    return this.dd.getAll("dia", ids)  }
    
  distribucionHoraria(ids: string[]): Observable<any> {
    return this.dd.getAll("distribucion_horaria", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'asignatura', 'asignatura', {'asi-id':'id', 'asi-nombre':'nombre', 'asi-formacion':'formacion', 'asi-clasificacion':'clasificacion', 'asi-codigo':'codigo', 'asi-perfil':'perfil', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'planificacion', 'planificacion', {'pla-id':'id', 'pla-anio':'anio', 'pla-semestre':'semestre', 'pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'pla-plan', 'plan', {'pla_plb-id':'id', 'pla_plb-orientacion':'orientacion', 'pla_plb-resolucion':'resolucion', 'pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
    )
  }
    
  domicilio(ids: string[]): Observable<any> {
    return this.dd.getAll("domicilio", ids)  }
    
  email(ids: string[]): Observable<any> {
    return this.dd.getAll("email", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'persona', 'persona', {'per-id':'id', 'per-nombres':'nombres', 'per-apellidos':'apellidos', 'per-fecha_nacimiento':'fecha_nacimiento', 'per-numero_documento':'numero_documento', 'per-cuil':'cuil', 'per-genero':'genero', 'per-apodo':'apodo', 'per-telefono':'telefono', 'per-email':'email', 'per-email_abc':'email_abc', 'per-alta':'alta', 'per-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', {'per_dom-id':'id', 'per_dom-calle':'calle', 'per_dom-entre':'entre', 'per_dom-numero':'numero', 'per_dom-piso':'piso', 'per_dom-departamento':'departamento', 'per_dom-barrio':'barrio', 'per_dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  file(ids: string[]): Observable<any> {
    return this.dd.getAll("file", ids)  }
    
  horario(ids: string[]): Observable<any> {
    return this.dd.getAll("horario", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'curso', 'curso', {'cur-id':'id', 'cur-horas_catedra':'horas_catedra', 'cur-ige':'ige', 'cur-alta':'alta', 'cur-comision':'comision', 'cur-asignatura':'asignatura', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur-comision', 'comision', {'cur_com-id':'id', 'cur_com-turno':'turno', 'cur_com-division':'division', 'cur_com-comentario':'comentario', 'cur_com-autorizada':'autorizada', 'cur_com-apertura':'apertura', 'cur_com-publicada':'publicada', 'cur_com-observaciones':'observaciones', 'cur_com-alta':'alta', 'cur_com-identificacion':'identificacion', 'cur_com-estado':'estado', 'cur_com-configuracion':'configuracion', 'cur_com-sede':'sede', 'cur_com-modalidad':'modalidad', 'cur_com-planificacion':'planificacion', 'cur_com-comision_siguiente':'comision_siguiente', 'cur_com-calendario':'calendario', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-sede', 'sede', {'cur_com_sed-id':'id', 'cur_com_sed-numero':'numero', 'cur_com_sed-nombre':'nombre', 'cur_com_sed-observaciones':'observaciones', 'cur_com_sed-alta':'alta', 'cur_com_sed-baja':'baja', 'cur_com_sed-fecha_traspaso':'fecha_traspaso', 'cur_com_sed-domicilio':'domicilio', 'cur_com_sed-tipo_sede':'tipo_sede', 'cur_com_sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-domicilio', 'domicilio', {'cur_com_sed_dom-id':'id', 'cur_com_sed_dom-calle':'calle', 'cur_com_sed_dom-entre':'entre', 'cur_com_sed_dom-numero':'numero', 'cur_com_sed_dom-piso':'piso', 'cur_com_sed_dom-departamento':'departamento', 'cur_com_sed_dom-barrio':'barrio', 'cur_com_sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', {'cur_com_sed_ts-id':'id', 'cur_com_sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', {'cur_com_sed_ce-id':'id', 'cur_com_sed_ce-nombre':'nombre', 'cur_com_sed_ce-cue':'cue', 'cur_com_sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', {'cur_com_sed_ce_dom-id':'id', 'cur_com_sed_ce_dom-calle':'calle', 'cur_com_sed_ce_dom-entre':'entre', 'cur_com_sed_ce_dom-numero':'numero', 'cur_com_sed_ce_dom-piso':'piso', 'cur_com_sed_ce_dom-departamento':'departamento', 'cur_com_sed_ce_dom-barrio':'barrio', 'cur_com_sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-modalidad', 'modalidad', {'cur_com_moa-id':'id', 'cur_com_moa-nombre':'nombre', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-planificacion', 'planificacion', {'cur_com_pla-id':'id', 'cur_com_pla-anio':'anio', 'cur_com_pla-semestre':'semestre', 'cur_com_pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_pla-plan', 'plan', {'cur_com_pla_plb-id':'id', 'cur_com_pla_plb-orientacion':'orientacion', 'cur_com_pla_plb-resolucion':'resolucion', 'cur_com_pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-calendario', 'calendario', {'cur_com_cal-id':'id', 'cur_com_cal-inicio':'inicio', 'cur_com_cal-fin':'fin', 'cur_com_cal-anio':'anio', 'cur_com_cal-semestre':'semestre', 'cur_com_cal-insertado':'insertado', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur-asignatura', 'asignatura', {'cur_asi-id':'id', 'cur_asi-nombre':'nombre', 'cur_asi-formacion':'formacion', 'cur_asi-clasificacion':'clasificacion', 'cur_asi-codigo':'codigo', 'cur_asi-perfil':'perfil', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'dia', 'dia', {'dia-id':'id', 'dia-numero':'numero', 'dia-dia':'dia', })
        }
      ),
    )
  }
    
  modalidad(ids: string[]): Observable<any> {
    return this.dd.getAll("modalidad", ids)  }
    
  persona(ids: string[]): Observable<any> {
    return this.dd.getAll("persona", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'domicilio', 'domicilio', {'dom-id':'id', 'dom-calle':'calle', 'dom-entre':'entre', 'dom-numero':'numero', 'dom-piso':'piso', 'dom-departamento':'departamento', 'dom-barrio':'barrio', 'dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  plan(ids: string[]): Observable<any> {
    return this.dd.getAll("plan", ids)  }
    
  planificacion(ids: string[]): Observable<any> {
    return this.dd.getAll("planificacion", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'plan', 'plan', {'plb-id':'id', 'plb-orientacion':'orientacion', 'plb-resolucion':'resolucion', 'plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
    )
  }
    
  planillaDocente(ids: string[]): Observable<any> {
    return this.dd.getAll("planilla_docente", ids)  }
    
  sede(ids: string[]): Observable<any> {
    return this.dd.getAll("sede", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'domicilio', 'domicilio', {'dom-id':'id', 'dom-calle':'calle', 'dom-entre':'entre', 'dom-numero':'numero', 'dom-piso':'piso', 'dom-departamento':'departamento', 'dom-barrio':'barrio', 'dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'tipo_sede', 'tipo_sede', {'ts-id':'id', 'ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'centro_educativo', 'centro_educativo', {'ce-id':'id', 'ce-nombre':'nombre', 'ce-cue':'cue', 'ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'ce-domicilio', 'domicilio', {'ce_dom-id':'id', 'ce_dom-calle':'calle', 'ce_dom-entre':'entre', 'ce_dom-numero':'numero', 'ce_dom-piso':'piso', 'ce_dom-departamento':'departamento', 'ce_dom-barrio':'barrio', 'ce_dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  telefono(ids: string[]): Observable<any> {
    return this.dd.getAll("telefono", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'persona', 'persona', {'per-id':'id', 'per-nombres':'nombres', 'per-apellidos':'apellidos', 'per-fecha_nacimiento':'fecha_nacimiento', 'per-numero_documento':'numero_documento', 'per-cuil':'cuil', 'per-genero':'genero', 'per-apodo':'apodo', 'per-telefono':'telefono', 'per-email':'email', 'per-email_abc':'email_abc', 'per-alta':'alta', 'per-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'per-domicilio', 'domicilio', {'per_dom-id':'id', 'per_dom-calle':'calle', 'per_dom-entre':'entre', 'per_dom-numero':'numero', 'per_dom-piso':'piso', 'per_dom-departamento':'departamento', 'per_dom-barrio':'barrio', 'per_dom-localidad':'localidad', })
        }
      ),
    )
  }
    
  tipoSede(ids: string[]): Observable<any> {
    return this.dd.getAll("tipo_sede", ids)  }
    
  toma(ids: string[]): Observable<any> {
    return this.dd.getAll("toma", ids).pipe(
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'curso', 'curso', {'cur-id':'id', 'cur-horas_catedra':'horas_catedra', 'cur-ige':'ige', 'cur-alta':'alta', 'cur-comision':'comision', 'cur-asignatura':'asignatura', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur-comision', 'comision', {'cur_com-id':'id', 'cur_com-turno':'turno', 'cur_com-division':'division', 'cur_com-comentario':'comentario', 'cur_com-autorizada':'autorizada', 'cur_com-apertura':'apertura', 'cur_com-publicada':'publicada', 'cur_com-observaciones':'observaciones', 'cur_com-alta':'alta', 'cur_com-identificacion':'identificacion', 'cur_com-estado':'estado', 'cur_com-configuracion':'configuracion', 'cur_com-sede':'sede', 'cur_com-modalidad':'modalidad', 'cur_com-planificacion':'planificacion', 'cur_com-comision_siguiente':'comision_siguiente', 'cur_com-calendario':'calendario', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-sede', 'sede', {'cur_com_sed-id':'id', 'cur_com_sed-numero':'numero', 'cur_com_sed-nombre':'nombre', 'cur_com_sed-observaciones':'observaciones', 'cur_com_sed-alta':'alta', 'cur_com_sed-baja':'baja', 'cur_com_sed-fecha_traspaso':'fecha_traspaso', 'cur_com_sed-domicilio':'domicilio', 'cur_com_sed-tipo_sede':'tipo_sede', 'cur_com_sed-centro_educativo':'centro_educativo', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-domicilio', 'domicilio', {'cur_com_sed_dom-id':'id', 'cur_com_sed_dom-calle':'calle', 'cur_com_sed_dom-entre':'entre', 'cur_com_sed_dom-numero':'numero', 'cur_com_sed_dom-piso':'piso', 'cur_com_sed_dom-departamento':'departamento', 'cur_com_sed_dom-barrio':'barrio', 'cur_com_sed_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-tipo_sede', 'tipo_sede', {'cur_com_sed_ts-id':'id', 'cur_com_sed_ts-descripcion':'descripcion', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed-centro_educativo', 'centro_educativo', {'cur_com_sed_ce-id':'id', 'cur_com_sed_ce-nombre':'nombre', 'cur_com_sed_ce-cue':'cue', 'cur_com_sed_ce-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_sed_ce-domicilio', 'domicilio', {'cur_com_sed_ce_dom-id':'id', 'cur_com_sed_ce_dom-calle':'calle', 'cur_com_sed_ce_dom-entre':'entre', 'cur_com_sed_ce_dom-numero':'numero', 'cur_com_sed_ce_dom-piso':'piso', 'cur_com_sed_ce_dom-departamento':'departamento', 'cur_com_sed_ce_dom-barrio':'barrio', 'cur_com_sed_ce_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-modalidad', 'modalidad', {'cur_com_moa-id':'id', 'cur_com_moa-nombre':'nombre', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-planificacion', 'planificacion', {'cur_com_pla-id':'id', 'cur_com_pla-anio':'anio', 'cur_com_pla-semestre':'semestre', 'cur_com_pla-plan':'plan', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com_pla-plan', 'plan', {'cur_com_pla_plb-id':'id', 'cur_com_pla_plb-orientacion':'orientacion', 'cur_com_pla_plb-resolucion':'resolucion', 'cur_com_pla_plb-distribucion_horaria':'distribucion_horaria', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur_com-calendario', 'calendario', {'cur_com_cal-id':'id', 'cur_com_cal-inicio':'inicio', 'cur_com_cal-fin':'fin', 'cur_com_cal-anio':'anio', 'cur_com_cal-semestre':'semestre', 'cur_com_cal-insertado':'insertado', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'cur-asignatura', 'asignatura', {'cur_asi-id':'id', 'cur_asi-nombre':'nombre', 'cur_asi-formacion':'formacion', 'cur_asi-clasificacion':'clasificacion', 'cur_asi-codigo':'codigo', 'cur_asi-perfil':'perfil', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'docente', 'persona', {'doc-id':'id', 'doc-nombres':'nombres', 'doc-apellidos':'apellidos', 'doc-fecha_nacimiento':'fecha_nacimiento', 'doc-numero_documento':'numero_documento', 'doc-cuil':'cuil', 'doc-genero':'genero', 'doc-apodo':'apodo', 'doc-telefono':'telefono', 'doc-email':'email', 'doc-email_abc':'email_abc', 'doc-alta':'alta', 'doc-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'doc-domicilio', 'domicilio', {'doc_dom-id':'id', 'doc_dom-calle':'calle', 'doc_dom-entre':'entre', 'doc_dom-numero':'numero', 'doc_dom-piso':'piso', 'doc_dom-departamento':'departamento', 'doc_dom-barrio':'barrio', 'doc_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'reemplazo', 'persona', {'ree-id':'id', 'ree-nombres':'nombres', 'ree-apellidos':'apellidos', 'ree-fecha_nacimiento':'fecha_nacimiento', 'ree-numero_documento':'numero_documento', 'ree-cuil':'cuil', 'ree-genero':'genero', 'ree-apodo':'apodo', 'ree-telefono':'telefono', 'ree-email':'email', 'ree-email_abc':'email_abc', 'ree-alta':'alta', 'ree-domicilio':'domicilio', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'ree-domicilio', 'domicilio', {'ree_dom-id':'id', 'ree_dom-calle':'calle', 'ree_dom-entre':'entre', 'ree_dom-numero':'numero', 'ree_dom-piso':'piso', 'ree_dom-departamento':'departamento', 'ree_dom-barrio':'barrio', 'ree_dom-localidad':'localidad', })
        }
      ),
      switchMap(
        (data:{ [index: string]: any; }[]) => {
          return this.dd.getAllColumnData(data, 'planilla_docente', 'planilla_docente', {'pd-id':'id', 'pd-numero':'numero', 'pd-insertado':'insertado', 'pd-fecha_contralor':'fecha_contralor', 'pd-fecha_consejo':'fecha_consejo', 'pd-observaciones':'observaciones', })
        }
      ),
    )
  }
    
}
