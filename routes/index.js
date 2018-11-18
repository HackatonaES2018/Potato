  var express = require('express');
  var router = express.Router();
  var TEF = require('../controller/TEF');
  var ApiCrditoPessoalDemo = require('api-credito-pessoal-demo'); 
  var apiCli = new ApiCrditoPessoalDemo.ClientesApi();
  var apiProp = new ApiCrditoPessoalDemo.PropostasApi();

  var clientId = '8bdb6a57-1c82-3b8c-9997-b47565298541';
  
  var ultimaProp = null;

  var sinc = 0;
 
var cpf = 88277222214; // {Number} CPF de uma pessoa que se deseja consultar

  
  router.post('/propostas', function(req, res, next) {

    let callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        ultimaProp = data.proposta;
        console.log(data);
        res.send(data);
      }
    };

  apiProp.propostasPost(clientId, req.body, callback);
  });

    router.get('/cpf', function(req, res, next) {

      let callback = function(error, data, response) {
        if (error) {
          console.error(error);
        } else {
          res.send(data);
        }
      };

    apiCli.clientesCpfContratosGet(clientId, req.query.cpf, callback);
  });




  function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

  module.exports = router;