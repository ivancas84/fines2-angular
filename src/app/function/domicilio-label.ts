
/**
 * Genera un label en funcion de los datos de domicilio
 */
export function domicilioLabel(element: {[i:string]:any}, prefix:string=""): string{
    var domicilio = ""
    if(element[prefix+"id"]) {
      domicilio = element[prefix+"calle"];
      if(element[prefix+"entre"]) domicilio +=  " e/ " + element[prefix+"entre"]
      domicilio +=  " nº " + element[prefix+"numero"]
      if(element[prefix+"barrio"]) domicilio +=  " " + element[prefix+"barrio"]
    }
    return domicilio
}

