import { DataDefinition } from '../../core/class/data-definition';

export class _ContralorDataDefinition extends DataDefinition {
  entity: string = 'contralor';

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
    this.stg.setItem("contralor" + rowCloned.id, rowCloned);
  }

}
