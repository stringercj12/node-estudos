const assert = require('assert')
const Context = require('../db/strategies/base/contextStrategy')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroisSchema')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super teia'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super teia'
}

let MOCK_HEROI_ID = "";

let context = {};


describe('MongoDB Strategy', function () {
    this.beforeAll(async () => {
        const connection = MongoDB.connect()
        context = new Context(new MongoDB(connection, HeroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })

    it('Verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado';

        assert.equal(result, expected)
    })

    it('Cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })

        const result = {
            nome,
            poder
        };


        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('Atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })
        console.log('result => ', result)

        assert.deepEqual(result.modifiedCount, 1)
    })

    it('Remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        console.log('result => ', result)
        console.log('MOCK_HEROI_ID => ', MOCK_HEROI_ID)
        assert.deepEqual(result.deletedCount, 1)
    })
})