const ICrud = require("./interfaces/interfaceCrud");
const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null
        this._herois = null
    }

    async defineModel() {
        this._herois = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        });

        await this._herois.sync();
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'jefferson',
            'minhasenhasecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )

        await this.defineModel()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error('Fail! ', error)
            return false
        }
    }


    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }

    async read(item = {}) {
        return this._herois.findAll({ where: item, raw: true })

    }

    async update(id, item) {
        console.log('id => ', id)
        return await this._herois.update(item, { where: { id: id }, raw: true })
    }

    async delete(id) {
        const query = id ? { id } : {}
        return await this._herois.destroy({ where: query })
    }
}

module.exports = Postgres