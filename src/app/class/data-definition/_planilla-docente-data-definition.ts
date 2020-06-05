import { DataDefinition } from 'src/app/core/class/data-definition';

export class _PlanillaDocenteDataDefinition extends DataDefinition {
  entity: string = 'planilla_docente';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    this.stg.setItem("planilla_docente" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["numero"]) ret = ret.trim() + " " + row["numero"];

    return ret.trim();
  }
}
