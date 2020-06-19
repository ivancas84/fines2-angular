import { _ComisionDataDefinition } from './_comision-data-definition';

export class ComisionDataDefinition extends _ComisionDataDefinition { 
    label (id: string | number): string {
        var comision = this.stg.getItem(this.entity + id);
        if(!comision) return null;
    
        var sede = this.stg.getItem("sede" + comision.sede);
        if(!sede) return null;
    
        var planificacion = this.stg.getItem("planificacion" + comision.planificacion);
    
        var calendario = this.stg.getItem("calendario" + comision.calendario);
    

        var ret = sede["numero"]+ comision["division"]; 
        
        if(planificacion) ret = ret + planificacion["anio"] + planificacion["semestre"];

        ret = ret + " ";

        if(calendario) {
          ret = ret + " " + calendario["anio"] + "-" + calendario["semestre"];
          if(calendario["inicio"]) ret = ret + " " + calendario["inicio"];
          if(calendario["fin"]) ret = ret + " " + calendario["fin"];
        }

        return ret.trim();
        
    }
}
