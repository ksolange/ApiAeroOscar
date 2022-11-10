// simula los datos

const getMongo = require("./mongodb.js") //1. 09/11/2022

const vuelosGet = async () => { // 5. se debe colocar un async 
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) // 6. se debe colocar un async y trae al cliente como tal  09/11
    const collection = await getMongo.getCollectionExport(client,nameDb) //2. 09/11       1er await  trae la colección 
    const vuelos = await collection.find({}).toArray()   // 3 y 4 se mezclan. 09/11 le pedimos traer los vuelos, debemos de volverel arreglo en este caso opuesto a lo q normalmente realizabamos con .find ---> query
    // vuelos = await vuelos.toArray()  // 4. 09/11     los objetos q tenga vuelos los vuelve un arreglo ||| colocar un 2do await aquí 

    await getMongo.closeClientExport(client) // 6. se cierra la query
    return vuelos
}

//05/11/2022
const vuelosGetId = async (id) => { 
    var vueloEncontrado = null
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) // 6. se debe colocar un async y trae al cliente como tal  09/11 
    const collection = await getMongo.getCollectionExport(client,nameDb) // 6. se debe colocar await  09/11
    await collection.findOne({"_id":id}).then(
        (respuesta ) => {
            vueloEncontrado = respuesta         
        }
    )
    await getMongo.closeClientExport(client)    // 7.no olvidar cerrar conexión
    return vueloEncontrado
}

const vuelosSet = async (vuelo) => {  // 4/11/2022 se esta trabajando en forma d memoria con una variable  llamada vuelos y cargo datos require el archivo json 
    // 5. se debe colocar un async  09/11
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) // 6. se debe colocar un async y trae al cliente como tal  09/11 
    const collection = await getMongo.getCollectionExport(client,nameDb) // 6. se debe colocar await  09/11
    //vuelos.push(vuelo)      // debería estar lo nuevo al final de la cola por el push
    await collection.insertMany(vuelo)     // 7. se debe colocar un insert  y un await 09/11
    await getMongo.closeClientExport(client) // 6. se cierra la conexión
    return await vuelosGet()  // 8. traig ala info d vuelosGet  09/11
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

const sillasReservadas = async(sillas, idvuelo) => { // 10/11 1. MODIFICACIÓN
    const nameDb = "aerolineaG1y2"
    const client =  await getMongo.getClientExport(nameDb) 
    const collection = await getMongo.getCollectionExport(client,nameDb) 

    var vuelo = null
    await collection.findOne({"_id":idvuelo}).then(
        (vueloresp) => {
            vuelo = vueloresp
        }
    )
    for (let isilla = 0; isilla < vuelo.sillas.length; isilla++){
        for (let j = 0; j < sillas.length; j++){
            if(vuelo.sillas[isilla].categoria === sillas[j].categoria){ // CASOS BORDERS AVERIGUAR
                if(sillas[j].cancelada){ //6. 10/11 para no tener q volver a repetir el código se coloca esta condición para usarle en reservaservice en reservasAcancelar
                    vuelo.sillas[isilla].silla += sillas[j].silla // 7. si la condición es == a true(cancelar) le suma las sillas q fueron quitadas
                    /*elif(vuelo.sillas[isilla].silla -= sillas[j].silla != a positivo) 
                    return "Silla no reservadas"
                    */
                }else {
                    vuelo.sillas[isilla].silla -= sillas[j].silla // 8. resto las sillas d la reserva 
                }
            }
        }
    }    

    await collection.updateOne({"_id":idvuelo},{"$set":{"silla":vuelo.sillas}})

    await getMongo.closeClientExport(client)
    return "Silla reservada"
}

module.exports.vuelosgetExport = vuelosGet;         //exportar
module.exports.vuelosSetExport = vuelosSet; 
module.exports.vuelosDeleteExport = vuelosDelete; 

module.exports.vuelosgetidExport = vuelosGetId;      //05/11/2022
module.exports.sillasReservadasExport = sillasReservadas;

