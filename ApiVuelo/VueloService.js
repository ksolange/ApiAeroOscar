// simula los datos

let vuelos = require("./vuelos.json")

const vuelosGet = () => {
    
    return vuelos

}

const vuelosSet = (vuelo) => {  // 4/11/2022 se esta trabajando en forma d memoria con una variable  llamada vuelos y cargo datos require el archivo json 
    vuelos.push(vuelo)      // debería estar lo nuevo al final de la cola por el push
    return vuelos
}

const vuelosDelete = (id) => {
    console.log(vuelos)
    vuelos = vuelos.filter((vuel) => { // es en una línea el return se hace ( ), si es más d una línea hacer el  {} true false
        return vuel.id != id
        }
    )
    console.log(vuelos)
    return vuelos
}

module.exports.vuelosgetExport = vuelosGet;         //exportar
module.exports.vuelosSetExport = vuelosSet; 
module.exports.vuelosDeleteExport = vuelosDelete; 
