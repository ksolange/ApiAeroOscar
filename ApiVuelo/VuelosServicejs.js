// simula los datos este para mi proyecto capturas precio = q productos pero con un solo por q recorra y q guarde lo acumulado para mostrar el total

let vuelos = require("./vuelos.json")

const vuelosGet = () => {
    
    return vuelos

}

//05/11/2022
const vuelosGetId = (id) =>{

    return vuelos.find((e) => {
        return e.id == id
        }
    )
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

const sillasReservadas = (sillas, idvuelo) => {
    for(let i = 0; i < vuelos.length; i ++){    // recorre el 1er for recorre vuelos
        if(idvuelo === vuelos[i].id){       // if encuentra el vuelo con el id q envíaron a reservar
            for(let ivuelo = 0; ivuelo < vuelos[i].sillas.length; ivuelo ++){    //con el vuelo q tengo un for para recorrer la sillas del vuelo
                // el problema era una s d sillas
                for(let j = 0; j < sillas.length; j++){ // con la categorías de la sillas compara si es de la misma clase (económica/ ejecutiva)
                    if(vuelos[i].sillas[ivuelo].categoria === sillas[j].categoria){ //actualizo el vuelo y la silla
                        vuelos[i].sillas[ivuelo].silla -= sillas[j].silla // resto el # enviadas a reservar 
                        // este queda quieto silla singular
                    }
                }
            }
            i = vuelos.length // aquí entra cuando se ha encontrado el vuelo 
        }
    }

    return "Silla reservada"
}

module.exports.vuelosgetExport = vuelosGet;         //exportar
module.exports.vuelosSetExport = vuelosSet; 
module.exports.vuelosDeleteExport = vuelosDelete; 

module.exports.vuelosgetidExport = vuelosGetId;      //05/11/2022
module.exports.sillasReservadasExport = sillasReservadas;

