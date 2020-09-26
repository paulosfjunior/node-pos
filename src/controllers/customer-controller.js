const repository = require('../repositories/customer-repository');

exports.post = async function (req, res) {
  await repository.post({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }).then(() => {
    res.status(201).send({
      message: 'Usuario cadastrado com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}

exports.get = async function (req, res) {
  await repository.get()
  .then((resultado) => {
    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhum usuario cadastrado.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.getId = async function (req, res) {
  const id = req.params.customerId;

  await repository.getId({
    _id: id
  }).then((resultado) => {
    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhum usuario cadastrado com esse ID.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.put = async function (req, res) {
  const id = req.params.customerId;
  await repository.put(
    {
      _id: id
    },
    {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    }
  ).then(() => {
    res.status(201).send({
      message: 'Usuario alterado com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}

exports.delete = async function (req, res) {
  const id = req.params.customerId;

  await repository.delete({
    _id: id
  }).then(() => {
    res.status(201).send({
      message: 'Usuario removido com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}
