// simula los datos

let pagos = require("./pagos.json")

const pagosGet = () => {
    
    return pagos

}

const pagosSet = (pago) => {  // 4/11/2022 se esta trabajando en forma d memoria con una variable  llamada pagos y cargo datos require el archivo json 
    pagos.push(pago)      // debería estar lo nuevo al final de la cola por el push
    return pagos
}

const pagosDelete = (id) => {
    console.log(pagos)
    pagos = pagos.filter((vuel) => { // es en una línea el return se hace ( ), si es más d una línea hacer el  {} true false
        return vuel.id != id
        }
    )
    console.log(pagos)
    return pagos
}

module.exports.pagosgetExport = pagosGet;         //exportar
module.exports.pagosSetExport = pagosSet; 
module.exports.pagosDeleteExport = pagosDelete; 
