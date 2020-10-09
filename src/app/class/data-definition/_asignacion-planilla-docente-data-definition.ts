import { DataDefinition } from '../../core/class/data-definition';

export class _AsignacionPlanillaDocenteDataDefinition extends DataDefinition {
  entity: string = 'asignacion_planilla_docente';

  storage(row: { [index: string]: any }){
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

}
