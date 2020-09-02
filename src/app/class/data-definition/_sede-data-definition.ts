import { DataDefinition } from '../../core/class/data-definition';

export class _SedeDataDefinition extends DataDefinition {
  entity: string = 'sede';

  storage(row: { [index: string]: any }){
    if(!row) return;
    var rowCloned = JSON.parse(JSON.stringify(row))
    /**
     * se realiza un 'deep clone' del objeto para poder eliminar atributos a medida que se procesa y no alterar la referencia original
     */
    if(('domicilio_' in rowCloned)
    ){
      this.stg.setItem('domicilio' + rowCloned['domicilio_'].id, rowCloned['domicilio_']);
      delete rowCloned['domicilio_'];
    }
    if(('tipo_sede_' in rowCloned)
    ){
      this.stg.setItem('tipo_sede' + rowCloned['tipo_sede_'].id, rowCloned['tipo_sede_']);
      delete rowCloned['tipo_sede_'];
    }
    if(('centro_educativo_' in rowCloned)
    && ('domicilio_' in rowCloned['centro_educativo_'])
    ){
      this.stg.setItem('domicilio' + rowCloned['centro_educativo_']['domicilio_'].id, rowCloned['centro_educativo_']['domicilio_']);
      delete rowCloned['centro_educativo_']['domicilio_'];
    }
    if(('centro_educativo_' in rowCloned)
    ){
      this.stg.setItem('centro_educativo' + rowCloned['centro_educativo_'].id, rowCloned['centro_educativo_']);
      delete rowCloned['centro_educativo_'];
    }
    this.stg.setItem("sede" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["numero"]) ret = ret.trim() + " " + row["numero"];

    if (row["nombre"]) ret = ret.trim() + " " + row["nombre"];

    return ret.trim();
  }
}
