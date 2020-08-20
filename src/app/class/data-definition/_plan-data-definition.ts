import { DataDefinition } from '../../core/class/data-definition';

export class _PlanDataDefinition extends DataDefinition {
  entity: string = 'plan';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("plan" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["orientacion"]) ret = ret.trim() + " " + row["orientacion"];

    if (row["distribucion_horaria"]) ret = ret.trim() + " " + row["distribucion_horaria"];

    return ret.trim();
  }
}
