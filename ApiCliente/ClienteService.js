const getMongo = require("./mongodb.js") //1. 09/11/2022

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

const clientesgetId = async (id) => {  // 08/11/2022 se crea para poder llamarle d forma parálela
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) // 6. se debe colocar un async y trae al cliente como tal  09/11 
    const collection = await getMongo.getCollectionExport(client,nameDb) // 6. se debe colocar await  09/11
    var clienteEncontrado = null
    await collection.findOne({"_id":id}).then(
        (client) => { // si lo quermos hacer d una sola línea sería sin el return ... client.id === id
            clienteEncontrado = client
        }
    ) // busco cliente por medio del .find 

    await getMongo.closeClientExport(client)    // 7.no olvidar cerrar conexión
    return clienteEncontrado
}

module.exports.clientesgetExport = clientesGet;         //exportar
module.exports.clientesSetExport = clientesSet; 
module.exports.clientesDeleteExport = clientesDelete; 

module.exports.clientesgetIdExport = clientesgetId;
