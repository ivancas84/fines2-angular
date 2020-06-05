import { PlanDataDefinition } from '@class/data-definition/plan-data-definition';
import { AsignaturaDataDefinition } from '@class/data-definition/asignatura-data-definition';
import { DataDefinition } from 'src/app/core/class/data-definition';

export class _CargaHorariaDataDefinition extends DataDefinition {
  entity: string = 'carga_horaria';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('plan_' in rowCloned)
    ){
      this.stg.setItem('plan' + rowCloned['plan_'].id, rowCloned['plan_']);
      delete rowCloned['plan_'];
    }
    if(('asignatura_' in rowCloned)
    ){
      this.stg.setItem('asignatura' + rowCloned['asignatura_'].id, rowCloned['asignatura_']);
      delete rowCloned['asignatura_'];
    }
    this.stg.setItem("carga_horaria" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["anio"]) ret = ret.trim() + " " + row["anio"];

    if (row["semestre"]) ret = ret.trim() + " " + row["semestre"];

    if (row["horas_catedra"]) ret = ret.trim() + " " + row["horas_catedra"];

    if(row.plan) {
      var e = new PlanDataDefinition(this.stg, this.parser);
      ret = ret.trim() + " " + e.label(row.plan);
    }
    if(row.asignatura) {
      var e = new AsignaturaDataDefinition(this.stg, this.parser);
      ret = ret.trim() + " " + e.label(row.asignatura);
    }
    return ret.trim();
  }
}
