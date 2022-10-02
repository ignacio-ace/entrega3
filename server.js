const express = require("express");
const contenedor = requiere ("./contenedor.js");
//crear el servidor
const app = express();
const productos = new contenedor ("productos.txt")
const numeroAleatorio = parseInt(Math.random()*20+1)


//configurar las rutas
app.get("/", (request, response)=>{
    response.send("<h1 style='color:blue'>Bienvenidos al servidor express</h1>")
})

let visitas = 0;
app.get("/productos", (req,res)=>{
    res.send(productos)
})



//levantar el servidor
app.listen(8080,()=>{
    console.log("server listening on port 8080")
})