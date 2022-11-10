const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const path = require("path")
const pagosService = require("./pagoService.js")

// llamado a la función express
const app = express()
const port = 8083

app.use(cors()) // usar cors en el aplicativo 
app.use(body_parser.json())// usar body-parse con cualquier dato json q llegue

const pathName = "/pagos";

app.get(pathName,        // función .get
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req)
        res.send(pagosService.pagosgetExport()) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export pagosService.pagosgetExport 04/11/2022
    }
)

/* función .get/id 05/11/2022
app.get(pathName + "/id",
    (req, res) => {
        console.log("Recibimos petición") 
        let id = req.query.id
        console.log(id)
        res.send(pagosService.pagosgetidExport(id)) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export pagosService.pagosgetExport 04/11/2022
    }
)*/



// función .post 04/11/2022 00:17:29 
app.post(pathName,
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req.body) // ya no viene vacío con ese req. viene enriquecido del body
        let pagos = pagosService.pagosSetExport(req.body) // 2. llamado a la funcion setExportpagosService.SetExport le envío request body 
        res.send({"mensaje": "el pago esta staging", "pagos":pagos})
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

// función .delete 04/11/2022
app.delete(pathName,
        (req, res) => {
        console.log("Recibimos petición ") 
        let id = req.query.id
        console.log(id) // ya no viene vacío con ese req. viene enriquecido del body
        let pagos = pagosService.pagosDeleteExport(id)
        res.send({"mensaje": "el pago esta staging", "pagos":pagos})
    }
)

app.listen(port,// escuchar puerto
    () => {
        console.log("Subio el app en el puerto" + port)
    }
)