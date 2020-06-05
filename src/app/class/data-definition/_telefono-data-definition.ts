import { DataDefinition } from 'src/app/core/class/data-definition';

export class _TelefonoDataDefinition extends DataDefinition {
  entity: string = 'telefono';

  storage(row: { [index: string]: any }){
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

}
