import { DataDefinition } from '../../core/class/data-definition';

export class _PersonaDataDefinition extends DataDefinition {
  entity: string = 'persona';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('domicilio_' in rowCloned)
    ){
      this.stg.setItem('domicilio' + rowCloned['domicilio_'].id, rowCloned['domicilio_']);
      delete rowCloned['domicilio_'];
    }
    this.stg.setItem("persona" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["nombres"]) ret = ret.trim() + " " + row["nombres"];

    if (row["apellidos"]) ret = ret.trim() + " " + row["apellidos"];

    if (row["numero_documento"]) ret = ret.trim() + " " + row["numero_documento"];

    return ret.trim();
  }
}
