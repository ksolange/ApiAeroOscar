const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const path = require("path")
const clientesService = require("./clienteService.js")

// llamado a la función express
const app = express()
const port = 8084

app.use(cors()) // usar cors en el aplicativo 
app.use(body_parser.json())// usar body-parse con cualquier dato json q llegue

const pathName = "/clientes";

app.get(pathName,        // función .get
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req)
        res.send(clientesService.clientesgetExport()) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export clientesService.clientesgetExport 04/11/2022
    }
)

// función .get 08/11/2022
app.get(pathName + "/id",
    (req, res) => {
        console.log("Recibimos petición") 
        let id = req.query.id // se recibe el id del cliente
        res.send(clientesService.clientesgetIdExport(id)) //respuesta q permite no quedarse en un bucle, q finalice todo se coloca el nuevo export clientesService.clientesgetExport 04/11/2022
    }
)



// función .post 04/11/2022 00:17:29 
app.post(pathName,
    (req, res) => {
        console.log("Recibimos petición") 
        console.log(req.body) // ya no viene vacío con ese req. viene enriquecido del body
        let clientes = clientesService.clientesSetExport(req.body) // 2. llamado a la funcion setExportclientesService.SetExport le envío request body 
        res.send({"mensaje": "el cliente esta staging", "clientes":clientes})
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
        let clientes = clientesService.clientesDeleteExport(id)
        res.send({"mensaje": "el cliente esta staging", "clientes":clientes})
    }
)

app.listen(port,// escuchar puerto
    () => {
        console.log("Subio el app en el puerto" + port)
    }
)