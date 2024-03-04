const express = require('express') //Importo la libreria
const app = express() //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3000; // Escuchar la ejecucion del servidor

const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect("mongodb+srv://ferneyrj573:kHlD36izYmhm5ZbX@express.2uyl5nb.mongodb.net/talentotech", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("¡Conexión a la base de datos exitosa!");
});

const UserSchema = require('./models/User.js');

app.use (express.urlencoded({extended:true}))
app.use (express.json())

router.get('/', (req, res)=>{

    res.send("Hello world")
})

router.get('/user/:id', (req, res)=>{

    //res.send("Hello world")
})


router.post('/user', (req, res)=>{
    //Crear un usuario
    let user = UserSchema({
    name: req.body.name,
    lastnane: req.body. lastname,
    enail: req.body.email,
    password: req. body. password,
    id: req. body. id

    })

    user. save()
    })



// router.post('/user', (req, res)=>{

//     var user = {

//         "name": req.body.name,
//         "lastname": req.body.lastname,
//         "age": req.body.age,
//     }

//     res.send(user)
// })

// router.get('/user', (req, res)=>{

    
//     res.send("Se ejecuto por GET")
    

// })

// router.post('/user', (req, res)=>{

    
//     res.send("Se ejecuto por POST")
    

// })

router.put('/user', (req, res)=>{

    
    res.send("Se ejecuto por PUT")
    

})

router.patch('/user', (req, res)=>{

    
    res.send("Se ejecuto por PATCH")
    

})

router.delete('/user', (req, res)=>{

    
    res.send("Se ejecuto por DELETE")
    

})

router.options('/user', (req, res)=>{

    
    res.send("Se ejecuto por OPTIONS")
    

})



//Ejecuto el servisor
app.use(router)
app.listen(port, () =>{
console.log('Listen on ' + port)

})
