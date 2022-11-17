
/**
 * Genera un label en funcion de los datos de domicilio
 * 
    @example data.forEach((element: { [x: string]: string; }) => {
        element["domicilio"] = domicilioLabel(element, "domicilio-")
    })
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


/**
 * Genera un label en funcion de los datos de domicilio
 */
export function comisionLabel(element: {[i:string]:any}, prefix:string=""): string{
  var c = comisionNumero(element, prefix)
  if(element["calendario-anio"]) c += " " + new Date(element["calendario-anio"]).getFullYear() + "-" +element["calendario-semestre"];
  return c;
}

/**
 * Genera un label en funcion de los datos de domicilio
 */
 export function comisionNumero(element: {[i:string]:any}, prefix:string=""): string{
  return element["sede-numero"] + element[prefix+"division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
}

export function cursoTomaActiva(element: {[i:string]:any}, prefix:string=""): string{
  var c = comisionNumero(element, prefix)
  if(element["calendario-anio"]) c += " " + new Date(element["calendario-anio"]).getFullYear() + "-" +element["calendario-semestre"];
  return c;
}


