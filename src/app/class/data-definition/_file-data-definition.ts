import { DataDefinition } from '../../core/class/data-definition';

export class _FileDataDefinition extends DataDefinition {
  entity: string = 'file';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("file" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["name"]) ret = ret.trim() + " " + row["name"];

    return ret.trim();
  }
}
