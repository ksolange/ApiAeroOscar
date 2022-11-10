const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const path = require("path")
const reservasService = require("./reservaService.js")

// llamado a la función express
const app = express()
const port = 8082

app.use(cors()) // usar cors en el aplicativo 
app.use(body_parser.json())// usar body-parse con cualquier dato json q llegue

const pathName = "/reservas";

app.get(pathName,        // función .get
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req)
        res.send(reservasService.reservasgetExport()) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export reservasService.reservasgetExport 04/11/2022
    }
)

app.get(pathName + "/pendientes/idcliente",       // función .get 08//11 pendientes d pago por idcliente o idvuelo
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req)
        idcliente = req.query.id
        res.send(reservasService.reservasPendientesIdgetExport(id))
    }
)

// función .post ESTE LE MODIFIQ PERO ESTABA = Q LOS DEMÁS SIN ASYNC Y SIN  AWAIT
app.post(pathName,  
    async (req, res) => {
        console.log("Recibimos petición") 
        console.log(req.body) // ya no viene vacío con ese req. viene enriquecido del body
        let reservas = await reservasService.reservasSetExport(req.body) // 2. llamado a la funcion setExportreservasService.SetExport le envío request body /// se debe hacer un await como en el otro archivo
        res.send({"mensaje": "el reserva esta staging", "reservas":reservas})
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

app.patch(pathName + "/reservas/estado", // modificado 08/11
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req.body) // ya no viene vacío con ese req. viene enriquecido del body
        res.send(reservasService.setEstadoReservaExport(req.body))
    }
)

// función .delete 04/11/2022
app.delete(pathName,
        (req, res) => {
        console.log("Recibimos petición ") 
        let id = req.query.id
        console.log(id) // ya no viene vacío con ese req. viene enriquecido del body
        let reservas = reservasService.reservasDeleteExport(id)
        res.send({"mensaje": "el reserva esta staging", "reservas":reservas})
    }
)

app.listen(port,// escuchar puerto
    () => {
        console.log("Subio el app en el puerto" + port)
    }
)