import { ComisionDataDefinition } from '@class/data-definition/comision-data-definition';
import { AsignaturaDataDefinition } from '@class/data-definition/asignatura-data-definition';
import { DataDefinition } from '../../core/class/data-definition';

export class _CursoDataDefinition extends DataDefinition {
  entity: string = 'curso';

  storage(row: { [index: string]: any }){
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

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if(row.comision) {
      var e = new ComisionDataDefinition(this.stg, this.parser);
      ret = ret.trim() + " " + e.label(row.comision);
    }
    if(row.asignatura) {
      var e = new AsignaturaDataDefinition(this.stg, this.parser);
      ret = ret.trim() + " " + e.label(row.asignatura);
    }
    return ret.trim();
  }
}
