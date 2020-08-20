import { DataDefinition } from '../../core/class/data-definition';

export class _DistribucionHorariaDataDefinition extends DataDefinition {
  entity: string = 'distribucion_horaria';

  storage(row: { [index: string]: any }){
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

}
