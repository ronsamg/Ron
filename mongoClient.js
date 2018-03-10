const MongoClient = require('mongodb').MongoClient;
const db = require('./configDb');

//Crea el JSON de estados
function crearEstados(data){
    return MongoClient.connect(db.url).then(
        function(client){   
        let db = client.db('maphub')
        let collections = db.collection('Ronprueba')
        
        return collections.insert(data)
        console.log(data)
    }).then(function(docs){
        console.log(docs)
        return docs
    })
}


//Trae todos los documentos del collection
function traerMexico(){
    return MongoClient.connect(db.url).then(
        function(client){   
        let db = client.db('maphub')
        let collections = db.collection('Ronprueba')
        return collections.find({}).toArray()
    }).then(function(docs){
        return docs
    }).catch(function(err){
        return err
    })
}

//Trae la info por Estado
function traerEstado(nombreestado){
    return MongoClient.connect(db.url).then(
        function(client){   
        let db = client.db('maphub')
        let collections = db.collection('Ronprueba')
        
        console.log(nombreestado)
        return (collections.find({"Estado" : nombreestado}).toArray())
    }).then(function(docs){
        console.log((docs))
        return docs
    }).catch(function(err){
        return err
    }) 
}


//Modifica la votacion en un estado.
function registrarTopico(estado,topico,valor){
       return MongoClient.connect(db.url).then(
        function(client){   
        let db = client.db('maphub')
        let collections = db.collection('Ronprueba')
        //let x = estado.toSting()
        return collections.update({"Estado" : estado},{"seguridad":{ $inc:{topico:1}}},{upsert:false})
        //return collections.update({"nombre":nombre},{$push:{"asistentes":{$each:[asistente]}})
    }).then(function(docs){
        
        return docs

    })
}


module.exports.crearEstados = crearEstados
module.exports.traerMexico = traerMexico
module.exports.registrarTopico = registrarTopico
module.exports.traerEstado = traerEstado
//module.exports.findEvento = findEvento   
