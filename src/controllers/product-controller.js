const mongoose = require('mongoose');
const repository = require('../repositories/product-repository');
const repCategoria = require('../repositories/category-repository');
const sLog = require('../repositories/log-repository');

exports.post = async function (req, res) {
  const idCategoria = mongoose.Types.ObjectId(req.body.idCategoria);
  const categoria = await repCategoria.getId(idCategoria);
  const dados = {
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
    categoria: req.body.idCategoria
  };
  
  if (categoria) {
    await repository.post(dados)
    .then(() => {
      sLog.post({
        tabela: 'produtos',
        descricao: `Produto cadastrado com sucesso! [${dados}]`
      });

      res.status(201).send({
        message: 'Produto cadastrado com sucesso!'
      });
    }).catch((error) => {
      res.status(500).send({
          message:`Falha ao processar a requisição: ${error}`
      })
    });
  } else {
    res.status(500).send({
      message:`Erro ao tentar salvar um novo produto, categoria com o id: ${idCategoria} não cadastrado`
    });
  }
}

exports.get = async function (req, res) {
  await repository.get()
  .then((resultado) => {
    sLog.post({
      tabela: 'produtos',
      descricao: `Produto buscados! [${resultado}]`
    });

    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhum produto cadastrado.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.getId = async function (req, res) {
  const id = req.params.productId;

  await repository.getId({
    _id: id
  }).then((resultado) => {
    sLog.post({
      tabela: 'produtos',
      descricao: `Produto buscado por ID ${id}! [${resultado}]`
    });

    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhum produto cadastrado com esse ID.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.put = async function (req, res) {
  const id = req.params.productId;
  const idCategoria = mongoose.Types.ObjectId(req.body.idCategoria);
  const categoria = await repCategoria.getId(idCategoria)
  const dados = {
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
    categoria: req.body.idCategoria
  };

  if (categoria) {
    await repository.put(
      {
        _id: id
      },
      dados
    ).then(() => {
      sLog.post({
        tabela: 'produtos',
        descricao: `Produto alterado com sucesso! ID: ${id} [${dados}]`
      });

      res.status(201).send({
        message: 'Produto alterado com sucesso!'
      });
    }).catch((error) => {
      res.status(500).send({
          message:`Falha ao processar a requisição: ${error}`
      })
    });
  } else {
    res.status(500).send({
      message:`Erro ao tentar alterar o produto, categoria com o id: ${idCategoria} não cadastrado`
    });
  }
}

exports.delete = async function (req, res) {
  const id = req.params.productId;

  await repository.delete({
    _id: id
  }).then(() => {
    sLog.post({
      tabela: 'produtos',
      descricao: `Produto removido com sucesso! [${id}]`
    });

    res.status(201).send({
      message: 'Produto removido com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}

exports.count = async function (req, res) {
  await repository.get()
  .then((resultado) => {
    sLog.post({
      tabela: 'produtos',
      descricao: `Produtos buscados! Existem ${resultado.length} produto(s) cadastrado(s).`
    });

    res.status(200).send({
      message: `Existem ${resultado.length} produto(s) cadastrado(s).`
    });
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}
