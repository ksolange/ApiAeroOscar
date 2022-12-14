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
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req)
        res.send(vuelosService.vuelosgetExport()) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export vuelosService.vuelosgetExport 04/11/2022
    }
)

// función .get/id 05/11/2022
app.get(pathName + "/id",
    (req, res) => {
        console.log("Recibimos petición") 
        let id = req.query.id
        console.log(id)
        res.send(vuelosService.vuelosgetidExport(req.query.id)) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export vuelosService.vuelosgetExport 04/11/2022
    }
)



// función .post 04/11/2022 00:17:29 
app.post(pathName,
    (req, res) => {
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
    (req, res) => {
        console.log("reserva sillas")
        console.log(req.body)
        id = req.query.id
        res.send(vuelosService.sillasReservadasExport(req.body,id))
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