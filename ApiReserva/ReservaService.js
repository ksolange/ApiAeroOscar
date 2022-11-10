
const getMongo = require("./mongodb.js") //1. 09/11/2022
let request = require("axios")  // 05/11/2022 request es solicitud q se hace

const reservasGet = async (idcliente) => {//2. 10/11, para el fronted necesito un id
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) // 6. se debe colocar un async y trae al cliente como tal  09/11
    const collection = await getMongo.getCollectionExport(client,nameDb) //2. 09/11       1er await  trae la colección  
   
    const reservas = collection.find({"idcliente":idcliente}) // 3. 10/11 es un obj {}
    const reservasList = await reservas.toArray()  //4. 10/11 arregloreservas
    await getMongo.closeClientExport(client)

    return  reservasList

}

const reservasSet = async (reserva) => {  // envío al request una url  + reserva + id vuelo
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) // 6. se debe colocar un async y trae al cliente como tal  09/11
    const collection = await getMongo.getCollectionExport(client,nameDb) //2. 09/11       1er await  trae la colección 
    console.log("Llama a reserva a guardar")
    const vuelo = request.get( // es una promesa 08/11/2022 desaparece el await y el .then perteneciente a esta promesa, esta en el nuevo archivo ReservaServiceOrdenado js
        "http://localhost:8081/vuelos/id/?id=" + reserva.idvuelo
    )

    const cliente  = request.get(
        "http://localhost:8084/clientes/id/?id=" + reserva.idcliente   // 08/11/2022
    )

    const reservarVuelo  = request.patch( 
        "http://localhost:8081/vuelos/sillas/?id=" + reserva.idvuelo,
        reserva.sillas                                   // 08/11/2022 envío lo q requiero para saber la reserva de las sillas q reserva. es una []
    )

    await request.all([vuelo, cliente,reservarVuelo])  // 08/11/2022 recibe las respuestas/ peticiones por medio de una lista [] y aparece el await
    .then( // 08/11/2022 este .then queda ya no pertenece a la promesa d arriba, porq este .then recibe la respuesta de todas las llamadas
        (res) => { // res es la respuesta o response a ese request.all de vuelo y cliente en lista, la 1ra posición es d vuelo y la segunda posición del cliente 
            console.log("Recibimos llamado del vuelo")
            console.log(res[0].data) // data trae la respuesta de reserva el objeto q cambio el 08/11/ por una lista y es recorrida por medio de subindíces
            console.log(res[1].data) // data trae la respuesta de reserva el objeto q cambio el 08/11/ por una lista y es recorrida por medio de subindíces
            console.log(res[2].data) // data trae la respuesta de reserva el objeto q cambio el 08/11/ por una lista y es recorrida por medio de subindíces
            reserva.vuelo = res[0].data // a reserva q entrar por parámetro asignele res.data
            reserva.cliente = res[1].data
            reserva.mensaje = res[2].data
        }
    )
    .catch(
        (res) => {
            console.log(res) // me AYUDO A encontrar el error de final d clase 8 d novimebre pero quite los console log de abajo
            console.log("Error") // 08/11 siempre y cuando encuentre un erro en alguno d los de arriba d los .then se encuentre un error (por ende no se ejecuta el .then sino el .catch)
        }
    )

    for(let i = 0 ; i < reserva.sillas.length; i++){    // 10/11 TUVE Q COLOCARLE PORQ EN LA BANDERA D CANCELADO D VUELOSERVICE  TENÍA Q HACER MÁS CÓDIGO Y ESTE ME AHORRABA MÁS TIEMPO
        reserva.sillas[i].cancelada = true
    }

    console.log(reserva)
    await collection.insertOne(reserva).then( // debería estar lo nuevo al final de la cola por el push)      
        (resultado) => {
            console.log(resultado)
        }
    )
    await getMongo.closeClientExport(client)
    return reserva
}

const reservasDelete = (id) => {
    console.log(reservas)
    reservas = reservas.filter((vuel) => { // es en una línea el return se hace ( ), si es más d una línea hacer el  {} true false
        return vuel.id != id
        }
    )
    console.log(reservas)
    return reservas
}

const reservasPendientesIdget = async (idcliente) => {
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) 
    const collection = await getMongo.getCollectionExport(client,nameDb)
    const reservasCliente = collection.find({"estadoPago":"Pendiente","idcliente": idcliente})  // query
    const reservasClienteList = reservasCliente.toArray()
    
    await getMongo.closeClientExport(client)
    return reservasClienteList
}

const setEstadoReserva = async (reservaPago) => { // 1. async await  traigo 3 mismos datosd siempre,  10/11
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) 
    const collection = await getMongo.getCollectionExport(client,nameDb)
    collection.updateOne({"_id":reservaPago.idreserva},{"$set":{"estadoPago":reservaPago.estadoReserva}}) // 10/11 en el front siempre se envía el id y gracias a él se modifico el estadoPAgo y los campos de reservaPago.estadoReserva, hago las querys desde aquí
    
    await getMongo.closeClientExport(client)
    return "Reserva con pago confirmado"
}

const reservasACancelar = async () => {     // 10/11 no tendrá funciones será solo un botón para cancelar y ya
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) 
    const collection = await getMongo.getCollectionExport(client,nameDb)

    const reservasCanceladas = collection.find({"estadoPago":"Pendiente"})
    await reservasCanceladas.forEach(
        async (reserva) => { // 10/11
            await request.patch( // 10/11
                "http://localhost:8081/vuelos/sillas/?id=" + reserva.idvuelo,
                reserva.sillas                                   // 10/11 aquí las reservas ya vienen canceladas con una bandera TRUE entonces empieza a sumar
            ).then(
                async () => {
                    await collection.updateOne({"_id":reserva._id}, {"$set":{"estadoPago":"Cancelada"}})  // 10/11 ya no aparecen como pendientes sino inmediatamente su estatus cambia a CANCELADA
                }
            )
                }
            );    // existe dos opciones 1 forEach para iterar el element(son las reservas) q trae el find les estado o el toArray para convertirle en lista y devolverle 
    await getMongo.closeClientExport(client)
    return "Reservas canceladas"

}

module.exports.reservasgetExport = reservasGet;         //exportar
module.exports.reservasSetExport = reservasSet; 
module.exports.reservasDeleteExport = reservasDelete; 
module.exports.reservasPendientesIdgetExport = reservasPendientesIdget;

module.exports.setEstadoReservaExport = setEstadoReserva; // faltaba exportarle 10/11
module.exports.reservasACancelarExport = reservasACancelar;
