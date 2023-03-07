const express = require("express");
const morgan = require("morgan");
const { Server} = require("socket.io");//este server funciona por encima del servidor de express
const http = require("http");
const cors = require("cors");//esto es para que permita trabajar a varios servidores


const app = express(); //servidor de express no es compatible totalmente con Servidor socket porque añade algunas configuraciones adicionales, por eso debemos agregar un modulo http de node.
const server = http.createServer(app);// con ese http vamos a crear un servidor, le vamos a pasar la confirguracion de express, finalment eno sda un nuevo objeto de servidor
const io = new Server(server, {//a este new server le debemos pasar un servidor http.
   cors: {
      origin: "*",
   }
});



//hasta aca ya tenemos la configuracion de socket.io

app.use(cors())
app.use(morgan("dev"));


io.on("connection", (socket) => {
    console.log(socket.id)

socket.on("message", (message) => {//desde el front solo enviams el mensaje, no se envia quien lo envia por eso aca lo hacemos, mandando el socket.id
socket.broadcast.emit("message", {//cuando vas a reenviar el mensaje al resto, no solo envies el texto, sino que tambien vas a enviar un objeto con la propiedad body que es el mensaje que recibiste y la propiedad from que será el id
   body: message,
   from: socket.id
})
})


})

server.listen(4000)// server es quien va a arrancar, no app porque englobamos a app con server, es quien tiene l aocnexion con socket.io
console.log("server listening 4000")