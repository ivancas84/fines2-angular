import { Injectable } from '@angular/core';

import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Parser } from '@class/parser';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class _DataDefinitionLabelService {

  constructor(protected dd: DataDefinitionService){ }

  label(entityName: string, id: string): Observable<string> {
    switch(entityName) {
      case "alumno": { return this.labelAlumno(id); }
      case "alumno_comision": { return this.labelAlumnoComision(id); }
      case "asignacion_planilla_docente": { return this.labelAsignacionPlanillaDocente(id); }
      case "asignatura": { return this.labelAsignatura(id); }
      case "calendario": { return this.labelCalendario(id); }
      case "calificacion": { return this.labelCalificacion(id); }
      case "cargo": { return this.labelCargo(id); }
      case "centro_educativo": { return this.labelCentroEducativo(id); }
      case "comision": { return this.labelComision(id); }
      case "comision_relacionada": { return this.labelComisionRelacionada(id); }
      case "contralor": { return this.labelContralor(id); }
      case "curso": { return this.labelCurso(id); }
      case "designacion": { return this.labelDesignacion(id); }
      case "detalle_persona": { return this.labelDetallePersona(id); }
      case "dia": { return this.labelDia(id); }
      case "disposicion": { return this.labelDisposicion(id); }
      case "disposicion_pendiente": { return this.labelDisposicionPendiente(id); }
      case "distribucion_horaria": { return this.labelDistribucionHoraria(id); }
      case "domicilio": { return this.labelDomicilio(id); }
      case "email": { return this.labelEmail(id); }
      case "file": { return this.labelFile(id); }
      case "horario": { return this.labelHorario(id); }
      case "modalidad": { return this.labelModalidad(id); }
      case "persona": { return this.labelPersona(id); }
      case "plan": { return this.labelPlan(id); }
      case "planificacion": { return this.labelPlanificacion(id); }
      case "planilla_docente": { return this.labelPlanillaDocente(id); }
      case "resolucion": { return this.labelResolucion(id); }
      case "sede": { return this.labelSede(id); }
      case "telefono": { return this.labelTelefono(id); }
      case "tipo_sede": { return this.labelTipoSede(id); }
      case "toma": { return this.labelToma(id); }
    }
  }
  labelAlumnoRow (row: any): string {
    if(!row) return null;

    let ret = "";
    return ret.trim();
  }

  labelAlumnoComisionRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelAsignacionPlanillaDocenteRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelAsignaturaRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["nombre"]) ret = ret.trim() + " " + row["nombre"];

    return ret.trim();
  }

  labelCalendarioRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["inicio"]) ret = ret.trim() + " " + Parser.dateFormat(Parser.date(row["inicio"]), 'd/m/Y');

    if (row["fin"]) ret = ret.trim() + " " + Parser.dateFormat(Parser.date(row["fin"]), 'd/m/Y');

    if (row["anio"]) ret = ret.trim() + " " + row["anio"];

    if (row["semestre"]) ret = ret.trim() + " " + row["semestre"];

    return ret.trim();
  }

  labelCalificacionRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelCargoRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["descripcion"]) ret = ret.trim() + " " + row["descripcion"];

    return ret.trim();
  }

  labelCentroEducativoRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["nombre"]) ret = ret.trim() + " " + row["nombre"];

    return ret.trim();
  }

  labelComisionRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["division"]) ret = ret.trim() + " " + row["division"];

    return ret.trim();
  }

  labelComisionRelacionadaRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelContralorRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelCursoRow (row: any): string {
    if(!row) return null;

    let ret = "";
    return ret.trim();
  }

  labelDesignacionRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelDetallePersonaRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelDiaRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["dia"]) ret = ret.trim() + " " + row["dia"];

    return ret.trim();
  }

  labelDisposicionRow (row: any): string {
    if(!row) return null;

    let ret = "";
    return ret.trim();
  }

  labelDisposicionPendienteRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelDistribucionHorariaRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelDomicilioRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["calle"]) ret = ret.trim() + " " + row["calle"];

    if (row["numero"]) ret = ret.trim() + " " + row["numero"];

    if (row["barrio"]) ret = ret.trim() + " " + row["barrio"];

    return ret.trim();
  }

  labelEmailRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelFileRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["name"]) ret = ret.trim() + " " + row["name"];

    return ret.trim();
  }

  labelHorarioRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelModalidadRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["nombre"]) ret = ret.trim() + " " + row["nombre"];

    return ret.trim();
  }

  labelPersonaRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["nombres"]) ret = ret.trim() + " " + row["nombres"];

    if (row["apellidos"]) ret = ret.trim() + " " + row["apellidos"];

    if (row["numero_documento"]) ret = ret.trim() + " " + row["numero_documento"];

    return ret.trim();
  }

  labelPlanRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["orientacion"]) ret = ret.trim() + " " + row["orientacion"];

    if (row["distribucion_horaria"]) ret = ret.trim() + " " + row["distribucion_horaria"];

    return ret.trim();
  }

  labelPlanificacionRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["anio"]) ret = ret.trim() + " " + row["anio"];

    if (row["semestre"]) ret = ret.trim() + " " + row["semestre"];

    return ret.trim();
  }

  labelPlanillaDocenteRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["numero"]) ret = ret.trim() + " " + row["numero"];

    return ret.trim();
  }

  labelResolucionRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["numero"]) ret = ret.trim() + " " + row["numero"];

    return ret.trim();
  }

  labelSedeRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["numero"]) ret = ret.trim() + " " + row["numero"];

    if (row["nombre"]) ret = ret.trim() + " " + row["nombre"];

    return ret.trim();
  }

  labelTelefonoRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelTipoSedeRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["descripcion"]) ret = ret.trim() + " " + row["descripcion"];

    return ret.trim();
  }

  labelTomaRow (row: any): string {
    if(!row) return null;

    let ret = "";
    if (row["id"]) ret = ret.trim() + " " + row["id"];

    return ret.trim();
  }

  labelAlumno(id: string): Observable<any> {
    return this.dd.get("alumno", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelAlumnoRow(row)),
            this.labelPersona(row.persona),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelAlumnoComision(id: string): Observable<any> {
    return this.dd.get("alumno_comision", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelAlumnoComisionRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelAsignacionPlanillaDocente(id: string): Observable<any> {
    return this.dd.get("asignacion_planilla_docente", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelAsignacionPlanillaDocenteRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelAsignatura(id: string): Observable<any> {
    return this.dd.get("asignatura", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelAsignaturaRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelCalendario(id: string): Observable<any> {
    return this.dd.get("calendario", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelCalendarioRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelCalificacion(id: string): Observable<any> {
    return this.dd.get("calificacion", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelCalificacionRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelCargo(id: string): Observable<any> {
    return this.dd.get("cargo", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelCargoRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelCentroEducativo(id: string): Observable<any> {
    return this.dd.get("centro_educativo", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelCentroEducativoRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelComision(id: string): Observable<any> {
    return this.dd.get("comision", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelComisionRow(row)),
            this.labelSede(row.sede),
            this.labelPlanificacion(row.planificacion),
            this.labelCalendario(row.calendario),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelComisionRelacionada(id: string): Observable<any> {
    return this.dd.get("comision_relacionada", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelComisionRelacionadaRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelContralor(id: string): Observable<any> {
    return this.dd.get("contralor", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelContralorRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelCurso(id: string): Observable<any> {
    return this.dd.get("curso", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelCursoRow(row)),
            this.labelComision(row.comision),
            this.labelAsignatura(row.asignatura),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelDesignacion(id: string): Observable<any> {
    return this.dd.get("designacion", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelDesignacionRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelDetallePersona(id: string): Observable<any> {
    return this.dd.get("detalle_persona", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelDetallePersonaRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelDia(id: string): Observable<any> {
    return this.dd.get("dia", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelDiaRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelDisposicion(id: string): Observable<any> {
    return this.dd.get("disposicion", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelDisposicionRow(row)),
            this.labelAsignatura(row.asignatura),
            this.labelPlanificacion(row.planificacion),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelDisposicionPendiente(id: string): Observable<any> {
    return this.dd.get("disposicion_pendiente", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelDisposicionPendienteRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelDistribucionHoraria(id: string): Observable<any> {
    return this.dd.get("distribucion_horaria", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelDistribucionHorariaRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelDomicilio(id: string): Observable<any> {
    return this.dd.get("domicilio", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelDomicilioRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelEmail(id: string): Observable<any> {
    return this.dd.get("email", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelEmailRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelFile(id: string): Observable<any> {
    return this.dd.get("file", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelFileRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelHorario(id: string): Observable<any> {
    return this.dd.get("horario", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelHorarioRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelModalidad(id: string): Observable<any> {
    return this.dd.get("modalidad", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelModalidadRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelPersona(id: string): Observable<any> {
    return this.dd.get("persona", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelPersonaRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelPlan(id: string): Observable<any> {
    return this.dd.get("plan", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelPlanRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelPlanificacion(id: string): Observable<any> {
    return this.dd.get("planificacion", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelPlanificacionRow(row)),
            this.labelPlan(row.plan),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelPlanillaDocente(id: string): Observable<any> {
    return this.dd.get("planilla_docente", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelPlanillaDocenteRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelResolucion(id: string): Observable<any> {
    return this.dd.get("resolucion", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelResolucionRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelSede(id: string): Observable<any> {
    return this.dd.get("sede", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelSedeRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelTelefono(id: string): Observable<any> {
    return this.dd.get("telefono", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelTelefonoRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelTipoSede(id: string): Observable<any> {
    return this.dd.get("tipo_sede", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelTipoSedeRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelToma(id: string): Observable<any> {
    return this.dd.get("toma", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelTomaRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

}
