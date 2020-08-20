import { DataDefinition } from '../../core/class/data-definition';

export class _DetallePersonaDataDefinition extends DataDefinition {
  entity: string = 'detalle_persona';

  storage(row: { [index: string]: any }){
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

}
