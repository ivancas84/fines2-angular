import { DataDefinition } from '../../core/class/data-definition';

export class _CalendarioDataDefinition extends DataDefinition {
  entity: string = 'calendario';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("calendario" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["inicio"]) ret = ret.trim() + " " + this.parser.dateFormat(this.parser.date(row["inicio"]), 'd/m/Y');

    if (row["fin"]) ret = ret.trim() + " " + this.parser.dateFormat(this.parser.date(row["fin"]), 'd/m/Y');

    if (row["anio"]) ret = ret.trim() + " " + row["anio"];

    if (row["semestre"]) ret = ret.trim() + " " + row["semestre"];

    return ret.trim();
  }
}
