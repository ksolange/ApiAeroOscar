/* simula los datos 05/11/2022
let reservas = require("./reservas.json")
let request = require("axios")  // 05/11/2022 request es solicitud q se hace

const reservasGet = () => {
    
    return reservas

}

const reservasSet = async (reserva) => {  // envío al request una url  + reserva + id vuelo
    console.log("Llama a reserva a guardar")
    await request.get( // es una promesa
        "http://localhost:8081/vuelos/id/?id=" + reserva.idvuelo
    )
    .then(
        (res) => { // res es la respuesta o response
            console.log("Recibimos llamado del reserva")
            console.log(res)
            console.log(res.data) // data trae la respuesta de reserva el objeto
            reserva.vuelo = res.data // a reserva q entrar por parámetro asignele res.data
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

module.exports.reservasgetExport = reservasGet;         //exportar
module.exports.reservasSetExport = reservasSet; 
module.exports.reservasDeleteExport = reservasDelete; 
*/