// npm install mongoose

const Mongoose = require('mongoose')
Mongoose.connect('mongodb://jefferson:minhasenhasecreta@localhost:27017/herois',
    { useNewUrlParser: true },
    function (error) {
        if (!error) return;
        console.log('Falha na conexão!', error);
    }
)
const connection = Mongoose.connection;


connection.once('open', () => console.log('database rodando'))
// const state = connection.readyState
// console.log('state', state);

/**
 * States database mongodb
 * 0: Desconectado
 * 1: Conectado
 * 2: Conectando
 * 3: Desconectando
 */

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('resultCadastrar ', resultCadastrar)

    const listItems = await model.find()

    console.log('Items ', listItems)
}

main()