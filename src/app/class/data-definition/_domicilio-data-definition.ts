import { DataDefinition } from 'src/app/core/class/data-definition';

export class _DomicilioDataDefinition extends DataDefinition {
  entity: string = 'domicilio';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("domicilio" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["calle"]) ret = ret.trim() + " " + row["calle"];

    if (row["numero"]) ret = ret.trim() + " " + row["numero"];

    if (row["barrio"]) ret = ret.trim() + " " + row["barrio"];

    return ret.trim();
  }
}
