const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('./mongoClient')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Crea el JSON de estados
app.post('/registro/json/',(req,res)=>{
    const{data} = req.body 
    MongoClient.crearEstados(data).then(
        function(state){
        res.send({state})
    })
})
//Trae todos los documentos del collection
app.get('/find/mapa/',(req,res)=>{
    const{nombreestado} = req.params
    MongoClient.traerMexico().then(
        function(mexico){
        res.send({mexico})
        //console.log(encuestas)
    })
})
//Trae la info por Estado 
app.get('/find/mapa/:estado',(req,res)=>{
    const {estado} = req.params
    console.log(typeof(estado))
    MongoClient.traerEstado(estado).then(function(data){
        console.log(typeof(data))   
        console.log(data)   
        res.send(data)
    })
})

//Modifica la votacion en un estado. 
app.post('/registro/encuesta/',(req,res)=>{
    const{estado,topico,valor} = req.body 
    console.log(req.body)
    MongoClient.registrarTopico(estado,topico,valor).then(
        function(rtopico){
        res.send({rtopico})
    })
})


app.listen(3000,() => {
    console.log(`Magic happens in port 3000!`)
});



