// docker ps
// docker exec -it 62f688ccaeca  mongo -u jefferson -p minhasenhasecreta --authenticationDatabase herois

// databases
show dbs

// mudando contexto para uma database
use herois

// mostrar tables (coleções)
show collections

// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})
for (let i = 0; i <= 50000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

// find
db.herois.find()
db.herois.find().pretty()


db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

// update
db.herois.update({ _id: ObjectId('6228e607a0ab80e6532eac05') }, { nome: 'Mulher Maravilha' })

db.herois.update({ poder: 'Velocidade' }, { $set: { poder: 'super força' } })

// delete

db.herois.remove({})
db.herois.remove({nome: 'Mulher Maravilha'})