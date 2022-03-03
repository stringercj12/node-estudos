/**
 * 0 - Obter um usuario
 * 1 - Obter o numero de telefone de um usuário a partir de seu Id
 * 2 - Obter o endereco do usuario pelo Id
 */

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback) {
  // quando der alguma problema -> reject(ERROR)
  // quando der success -> resolve()
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date(),
      });
    }, 1000);
  })

}

function obterTelefone(usuarioId) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        telefone: '1199002',
        ddd: 11
      });
    }, 2000);
  })
}

function obterEndereco(usuarioId, callback) {
  setTimeout(function () {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    });
  }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error('DEU RUIM em USUARIO => ', error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error('DEU RUIM em TELEFONE => ', error);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error('DEU RUIM em TELEFONE => ', error);
        return;
      }

      console.log(`
        Nome: ${usuario.nome},
        Endereco: ${endereco.rua}, ${endereco.numero},
        Telefone: (${usuario.ddd}) ${usuario.telefone},
      `)
    })
  })
});


main();
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);

    const telefone = resultado[0];
    const endereco = resultado[1]

    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereco: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error("DEU RUIM => ", error)
  }
}


// const usuarioPromise = obterUsuario()

// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           id: usuario.id,
//           nome: usuario.nome,
//         },
//         telefone: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     console.log(`
//     Nome: ${resultado.usuario.nome}
//     Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//     Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//     `)
//   }).catch(function (error) {
//     console.error("DEU RUIM => ", error)
//   })