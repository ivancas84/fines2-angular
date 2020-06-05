import { _ComisionDataDefinition } from './_comision-data-definition';
import { SedeDataDefinition } from './sede-data-definition';

export class ComisionDataDefinition extends _ComisionDataDefinition { 
    label (id: string | number): string {
        var comision = this.stg.getItem(this.entity + id);
        if(!comision) return null;
        var sede = this.stg.getItem("sede" + comision.sede);
        if(!sede) return null;
        var planificacion = this.stg.getItem("planificacion" + comision.planificacion);
        var ret = sede["numero"]+ comision["division"] + planificacion["anio"] + planificacion["semestre"];
        return ret.trim();
    }

}
