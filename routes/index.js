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
  res.set("Access-Control-Allow-Origin", "http://localhost:8008");
  let aaa = TEF.perguntas(req.body.question, req.body.answer);
  TEF.respostas({
    'question' : req.body.question,
    'answer' :req.body.answer
});
  console.log('REQUEST::::' + JSON.stringify(req.body));
  console.log('antes reti'+ JSON.stringify(aaa));
    setTimeout(()=>  res.send(aaa),100);
});

router.post('/chat/inicia', function(req, res, next) {
  if(sinc > 0){res.status(204).send}
  else{
    res.set("Access-Control-Allow-Origin", "http://localhost:8008");
    TEF.respostas({
      'question' : req.body.question,
      'answer' :req.body.answer
  });
    let response =
    {
        "question":"Qual a sua idade?",
        "answer":["de 18 a 30", "de 30 a 40.", "de 40 a 50.", "de 50 a 60."]
    }
    console.log('REQUEST::::' + JSON.stringify(req.body));
    console.log()
      setTimeout(()=>  res.send(response),100);
  }
});

router.get('/resp', function(req, res, next) {
    res.send(TEF.getResp());
});
  
  router.post('/propostas', function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "http://localhost:8008");

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
          console.log(data);
          res.send(data.ofertas[0]);
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