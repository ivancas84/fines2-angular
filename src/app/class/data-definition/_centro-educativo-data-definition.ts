import { DataDefinition } from 'src/app/core/class/data-definition';

export class _CentroEducativoDataDefinition extends DataDefinition {
  entity: string = 'centro_educativo';

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
    this.stg.setItem("centro_educativo" + rowCloned.id, rowCloned);
  }

  label (id: string | number): string {
    var row = this.stg.getItem(this.entity + id);
    if(!row) return null;

    let ret = "";
    if (row["nombre"]) ret = ret.trim() + " " + row["nombre"];

    return ret.trim();
  }
}
