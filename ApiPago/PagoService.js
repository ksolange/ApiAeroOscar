
const getMongo = require("./mongodb.js") //1. 09/11/2022
let request = require("axios")  // 05/11/2022 request es solicitud q se hace

const pagosGet = async (idclient) => { //4. 10/11
    const nameDb = "aerolineaG1y2" // 2.10/11
    const client =  await getMongo.getClientExport(nameDb) 
    const collection = await getMongo.getCollectionExport(client,nameDb) 

    const pagos = collection.find({"idclient":idclient}) // NO _id.. porq a este se les envía un objeto a != d bd
    const pagosList = await pagos.toArray() //llama a la función 

    await getMongo.closeClientExport(client)      
    return pagosList
}

const pagosSet = async (pago) => {  // 1.10/11
    const nameDb = "aerolineaG1y2" // 2.10/11
    const client =  await getMongo.getClientExport(nameDb) 
    const collection = await getMongo.getCollectionExport(client,nameDb) 

    if(pago.estado == "Aprobado"){
        const reserva = request.patch(
            "localhost:8082/reservas/estado",
            {"idreserva":pago.idreserva, "estadoReserva":"Confirmado"}
        ).then(
            console.log("Reserva confirmada")
        )
    }
    await collection.insertOne(pago).then(       //3. 10/11  await getMongo.closeClientExport(client) 
        (resp) => {
            console.log(resp)
            console.log("Pago REgistrado")
        }
    )
    await getMongo.closeClientExport(client)      
    return pago
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
