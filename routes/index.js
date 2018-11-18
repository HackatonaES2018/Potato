  var express = require('express');
  var router = express.Router();
  var TEF = require('../controller/TEF');
  var ApiCrditoPessoalDemo = require('api-credito-pessoal-demo'); 
  var api = new ApiCrditoPessoalDemo.ClientesApi()
  var clientId = '8bdb6a57-1c82-3b8c-9997-b47565298541';
  
  var resposta = null;

  var sinc = 0;
 
var cpf = 88277222214; // {Number} CPF de uma pessoa que se deseja consultar

  
  router.post('/alteracartao', function(req, res, next) {
    numeroCartao = req.body.cartao;
    console.log(req.body.cartao);
    res.status(204).send();
  });

    router.get('/cpf', function(req, res, next) {

      var callback = function(error, data, response) {
        if (error) {
          console.error(error);
        } else {
          res.send(data);
        }
      };

    api.clientesCpfContratosGet(clientId, req.query.cpf, callback);
  });




  function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

  module.exports = router;