import { DataDefinition } from 'src/app/core/class/data-definition';

export class _TipoSedeDataDefinition extends DataDefinition {
  entity: string = 'tipo_sede';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("tipo_sede" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["descripcion"]) ret = ret.trim() + " " + row["descripcion"];

    return ret.trim();
  }
}
