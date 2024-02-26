/** Configuracion de express **/
const express = require('express') //Importo la libreria
const app = express() //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3000; // Escuchar la ejecucion del servidor
/** Importacion de variables de entorno */
require('dotenv').config() // Obetenmos las variables de entorno
/** Web Sockets */
const socket = require('socket.io') // Importamos la libreria socket.io
const http = require('http').Server(app)
const io = socket(http)
const UserSchema = require('./models/user.js');
/** Conexion a BD */
const DB_URL = process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect("mongodb+srv://ferneyrj573:kHlD36izYmhm5ZbX@express.2uyl5nb.mongodb.net/t alentotech") // Creo la cadena de conexion

/** Importacion de Rutas */
const userRoutes = require('./routes/UserRoutes');
const houseRoutes = require('./routes/HouseRoutes');
const messageRoutes = require('./routes/MessageRoutes');

const MessageSchema = require('./models/Message');

//Metodo [GET, POST, PUT, PATCH, DELETE]
// Nombre del servicio [/]
router.get('/', (req, res) => {
    //Informacion a modificar
    res.send("Hello world")
})

router.post('/user', (req, res)=>{
    //Crear un usuario
    let user = UserSchema({
    name: req.body.name,
    lastnane: req.body. lastname,
    enail: req.body.email,
    password: req. body. password

    })
})

    user. save(err, data);{

        if (err) {
            res.send("Me jecute por POST")         
        }else{
            res.send(user)
        }
    }


/** Metodos websocket*/
io.on('connect', (socket) => {
    console.log("connected")
    //Escuchando eventos desde el servidor
    socket.on('message', (data) => {
        /** Almacenando el mensaje en la BD */
        var payload = JSON.parse(data)
        console.log(payload)
        /** Lo almaceno en la BD */
        MessageSchema(payload).save().then((result) => {
            /** Enviando el mensaje a todos los clientes conectados al websocket */
            socket.broadcast.emit('message-receipt', payload)
        }).catch((err) => {
            console.log({"status" : "error", "message" :err.message})
        })        
    })

    socket.on('disconnect', (socket) => {
        console.log("disconnect")    
    })
})

/** Configuraciones express */
app.use(express.urlencoded({extended: true})) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON
app.use((req, res, next) => {
    res.io = io
    next()
})
//Ejecuto el servidor
app.use(router)
app.use('/uploads', express.static('uploads'));
app.use('/', userRoutes)
app.use('/', houseRoutes)
app.use('/', messageRoutes)

/** Ejecucion del servidor */
http.listen(port, () => {
    console.log('Listen on ' + port)
})