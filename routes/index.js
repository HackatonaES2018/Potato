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

router.post('/chat', function(req, res, next) {
  if(req.body.r == ""){
    res.status(400).send;
  }else TEF.respostas({
    'pergunta' : req.body.pergunta,
    'resposta' :req.body.resposta
});
console.log(req.body.pergunta, req.body.resposta);
    setTimeout(()=>  res.send(TEF.perguntas(req.body.pergunta, req.body.resposta)),100);
});

router.get('/resp', function(req, res, next) {
    res.send(TEF.getResp());
});
  
  router.post('/propostas', function(req, res, next) {

    let callback1 = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        ultimaProp = data.proposta;
        console.log(data)
        prop();
      }
    };  

      let callback2 = function(error, data, response) {
        if (error) {
          console.error(error);
        } else {
          console.log(data)
          res.send(data);
        }
    };

    function prop(){
    apiProp.propostasPropostaStatusGet(clientId, ultimaProp, callback2);
    }
    apiProp.propostasPost(clientId, req.body, callback1);

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