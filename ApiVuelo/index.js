const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const path = require("path")
const vuelosService = require("./VueloService.js")

// llamado a la función express
const app = express()
const port = 8081

app.use(cors()) // usar cors en el aplicativo 
app.use(body_parser.json())// usar body-parse con cualquier dato json q llegue

const pathName = "/vuelos";

app.get(pathName,        // función .get
    async (req, res) => {     // 09/11 para poder obtener los datos del vuelosservice colocar async para q funcione el await
        console.log("Recibimos petición") 
        console.log(req)
        res.send(await vuelosService.vuelosgetExport()) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export vuelosService.vuelosgetExport 04/11/2022
        // 1er await del index 09/11 para poder obtener los datos del vuelosservice
    }
)

// función .get/id 05/11/2022
app.get(pathName + "/id",
    async (req, res) => {
        console.log("Recibimos petición") 
        const id = req.query.id
        console.log(id)
        res.send(await vuelosService.vuelosgetidExport(id)) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export vuelosService.vuelosgetExport 04/11/2022
    }
)



// función .post 04/11/2022 00:17:29 
app.post(pathName,
    async (req, res) => {     // 5. se debe colocar un async  09/11
        console.log("Recibimos petición") 
        console.log(req.body) // ya no viene vacío con ese req. viene enriquecido del body
        let vuelos = vuelosService.vuelosSetExport(req.body) // 2. llamado a la funcion setExportvuelosService.SetExport le envío request body 
        res.send({"mensaje": "el vuelo esta staging", "vuelos":vuelos})
    }
)


// función .put 04/11/2022
app.put(pathName,
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req.body) // ya no viene vacío con ese req. viene enriquecido del body
        res.send("Finaliza")
    }
)

// función .patch 04/11/2022

app.patch(pathName,
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req.body) // ya no viene vacío con ese req. viene enriquecido del body
        res.send("Finaliza")
    }
)

app.patch(pathName + "/sillas", // 08/11
    async(req, res) => { //async 10/11
        console.log("reserva sillas")
        console.log(req.body)
        id = req.query.id
        res.send(await vuelosService.sillasReservadasExport(req.body,id)) //await 10/11
    }
)

// función .delete 04/11/2022
app.delete(pathName,
        (req, res) => {
        console.log("Recibimos petición ") 
        let id = req.query.id
        console.log(id) // ya no viene vacío con ese req. viene enriquecido del body
        let vuelos = vuelosService.vuelosDeleteExport(id)
        res.send({"mensaje": "el vuelo esta staging", "vuelos":vuelos})
    }
)

app.listen(port,// escuchar puerto
    () => {
        console.log("Subio el app en el puerto" + port)
    }
)