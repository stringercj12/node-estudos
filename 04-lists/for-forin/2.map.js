const service = require('./service');

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
}

async function main() {
  try {
    const response = await service.obterPessoas('a');
    // const names = [];
    // response.results.forEach(function (item) {
    //   names.push(item.name);
    // });

    // const names = response.results.map(function (pessoa) {
    //   return pessoa.name
    // })

    // const names = response.results.map((pessoa) => pessoa.name);

    const names = response.results.meuMap(function (pessoa, indice) {
      return `[${indice}] - ${pessoa.name}`
    })

    console.log('names => ', names);
  } catch (error) {
    console.error(`DEU RUIM => ${error}`)
  }
}

main();