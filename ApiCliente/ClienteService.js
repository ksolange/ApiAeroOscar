// simula los datos

let clientes = require("./clientes.json")

const clientesGet = () => {
    
    return clientes

}

const clientesSet = (cliente) => {  // 4/11/2022 se esta trabajando en forma d memoria con una variable  llamada clientes y cargo datos require el archivo json 
    clientes.push(cliente)      // debería estar lo nuevo al final de la cola por el push
    return clientes
}

const clientesDelete = (id) => {
    console.log(clientes)
    clientes = clientes.filter((vuel) => { // es en una línea el return se hace ( ), si es más d una línea hacer el  {} true false
        return vuel.id != id
        }
    )
    console.log(clientes)
    return clientes
}

module.exports.clientesgetExport = clientesGet;         //exportar
module.exports.clientesSetExport = clientesSet; 
module.exports.clientesDeleteExport = clientesDelete; 
