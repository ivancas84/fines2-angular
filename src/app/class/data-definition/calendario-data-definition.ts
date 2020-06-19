import { _CalendarioDataDefinition } from './_calendario-data-definition';

export class CalendarioDataDefinition extends _CalendarioDataDefinition { 


  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    var ret = row["anio"] + "-" + row["semestre"];

    if (row["inicio"]) ret = ret.trim() + " " + this.parser.dateFormat(this.parser.date(row["inicio"]), 'd/m/Y');

    if (row["fin"]) ret = ret.trim() + " " + this.parser.dateFormat(this.parser.date(row["fin"]), 'd/m/Y');

    return ret.trim();
  }
}
