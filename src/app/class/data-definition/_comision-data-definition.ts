import { SedeDataDefinition } from '@class/data-definition/sede-data-definition';
import { PlanificacionDataDefinition } from '@class/data-definition/planificacion-data-definition';
import { CalendarioDataDefinition } from '@class/data-definition/calendario-data-definition';
import { DataDefinition } from '../../core/class/data-definition';

export class _ComisionDataDefinition extends DataDefinition {
  entity: string = 'comision';

  storage(row: { [index: string]: any }){
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

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["division"]) ret = ret.trim() + " " + row["division"];

    if(row.sede) {
      var e = new SedeDataDefinition(this.stg, this.parser);
      ret = ret.trim() + " " + e.label(row.sede);
    }
    if(row.planificacion) {
      var e = new PlanificacionDataDefinition(this.stg, this.parser);
      ret = ret.trim() + " " + e.label(row.planificacion);
    }
    if(row.calendario) {
      var e = new CalendarioDataDefinition(this.stg, this.parser);
      ret = ret.trim() + " " + e.label(row.calendario);
    }
    return ret.trim();
  }
}
