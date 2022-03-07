const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "Id do Heroi")

    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "Listar um heroi")
    .option('-r, --remover', "Remove um heroi por id")
    .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")
    .parse(process.argv)

  const heroi = new Heroi(Commander);

  try {
    if (Commander.cadastrar) {
      delete heroi.id;
      const resultado = await Database.cadastrar(heroi)
      if (!resultado) {
        console.error('Heroi não foi cadastrado!')
        return;
      }

      console.log('Heroi cadastrado com sucesso')
    }

    if (Commander.listar) {
      const resultado = await Database.listar()
      console.log(resultado)
      return;
    }

    if (Commander.remover) {
      const resultado = await Database.remover(heroi.id)
      if (!resultado) {
        console.error('Não foi possível remover o Heroi!')
        return;
      }
      console.log('Heroi removido com sucesso')
      return;
    }

    if (Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);
      delete heroi.id;
      // remover todas as chaves que estiverem com undefined | null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
      if (!resultado) {
        console.error('Não foi possível atualizar o Heroi!')
        return;
      }
      console.log('Heroi atualizado com sucesso')
      return;
    }

  } catch (error) {
    console.error('DEU RUIM => ', error)
  }
}

main();