// como tengo muchas conexiones debo dividir las cosas antes q se sature

const {MongoClient} = require("mongodb") //1

const getClient = async (nameDb) => {// 2. creación collección asincrónica 
    // const nameDb = "aerolineaG1y2"     // 3. bd 
    const url = "mongodb+srv://MisionTic2:MisionTic2022@cluster0.z0ip0xd.mongodb.net/" + nameDb  //4. conexión bd tal vez este + nameDb me falto en LA CARPETA DE MONGODB de mis otros proyectos
    const client = new MongoClient(url)  //5

    await client.connect() // 6 conexión real
    .then(  // 7. promesa d MongoClient
        (db) => {
            console.log(db)
            console.log("Conexión éxitosa")
        }
    )
    .catch (    // 8. posible error
        (error) => {
            console.log(error)
            console.log("Error d conexión a bd")
        }
    )

    return client //11 return collección
}

const getCollection = async (client, nameDb) => {  
    const db = client.db(nameDb)  // 9. sale la bd ya con conexión // debo hacer así replicar esto = pero con != colecciones  ósea != a vuelos, productos etc

    const collection = await db.collection("reservas")        // 10. colección con quién se va a hacer es con vuelos en esta apivuelos

    return collection //11 return collección

}

const closeClient = async (client) => {        // para cerrarle tuvo q colocar este cierre a la conexión
    await client.close()
}

module.exports.getCollectionExport = getCollection;

module.exports.getClientExport = getClient;

module.exports.closeClientExport = closeClient;


/*
como tuvo problemas con tanto código y conexiones abiertas cambio pero antes estaba así:

const getCollection = async () => {// 2. creación collección asincrónica 
    const nameDb = "aerolineaG1y2"     // 3. bd 
    const url = "mongodb+srv://MisionTic2:MisionTic2022@cluster0.z0ip0xd.mongodb.net/" + nameDb  //4. conexión bd tal vez este + nameDb me falto en LA CARPETA DE MONGODB de mis otros proyectos
    const client = new MongoClient(url)  //5

    await client.connect() // 6 conexión real
    .then(  // 7. promesa d MongoClient
        (db) => {
            console.log("Conexión éxitosa")
        }
    )
    .catch (    // 8. posible error
        (error) => {
            console.log("Error d conexión a bd")
        }
    )

  const db = client.db(nameDb)  // 9. sale la bd ya con conexión 

    const collection = await db.collection("vuelos")        // 10. colección con quién se va a hacer es con vuelos en esta apivuelos

    return collection //11 return collección

*/