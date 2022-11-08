// simula los datos 05/11/2022
let reservas = require("./reservas.json")
let request = require("axios")  // 05/11/2022 request es solicitud q se hace

const reservasGet = () => {
    
    return reservas

}

const reservasSet = async (reserva) => {  // envío al request una url  + reserva + id vuelo
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
            console.log("Recibimos llamado del reserva")
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
            console.log("Error") // 08/11 siempre y cuando encuentre un erro en alguno d los de arriba d los .then se encuentre un error (por ende no se ejecuta el .then sino el .catch)
        }
    )

    console.log(reserva)
    reservas.push(reserva)      // debería estar lo nuevo al final de la cola por el push
    console.log(reservas)
    return reservas
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

const reservasPendientesIdget = (idcliente) => {

    const reservasCliente = reservas.filter(  // filter
        (reser) => {
            return reser.estadoPago === "Pendiente" &&  reser.idcliente === idcliente  // condición pago es dependiente y reserva sea del cliente q llego
        }
    ) 
    
    return reservasCliente
}

const setEstadoReserva = (reservaPago) => {
    for (let i = 0; i < reservas.length; i ++){
        if(reservas[i].id === reservaPago.idreserva){
            reservas[i].estadoPago = reservaPago.estadoReserva
            i = reservas.length
        }
    }
    return "Reserva con pago confirmado"
}

module.exports.reservasgetExport = reservasGet;         //exportar
module.exports.reservasSetExport = reservasSet; 
module.exports.reservasDeleteExport = reservasDelete; 
module.exports.reservasPendientesIdgetExport = reservasPendientesIdget;
