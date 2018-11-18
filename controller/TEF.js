
const array = 
[
    {"Qual a sua idade?":["de 18 a 30", "de 30 a 40.", "de 40 a 50.", "de 50 a 60."]},
    {"Ótimo! Agora escolha o seu perfil:":["Aposentado", "Servidor publico", "Pensionista", "Militar", "Assalariado privado", "Autonomo", "Desempregado"]},
    {"Voce mora com os pais?":["sim", "não"]},
    {"Voce é casado?":["sim", "não"]},
    {"Voce possui bens no seu nome?": ["casa", "carro", "participa de clube"]},
    {"Voce esta negativado no serasa":["sim", "não"]},
    {"Voce já teve algum investimento?":["sim", "não"]},
    {"O que aconteceu com ele?":["Deu certo", "Deu errado"]},
    {"Voce ja contratou linha de credito anteriormente?":["sim", "não"]},
    {"Qual o motivo?":["Investimento", "Pagamento de dividas"]},
    {"Consegiu pagar em dia?":["sim", "não"]}

];
var respostas = [];

TEF = {
    
    get: function(nome){
        return respostas.find(function (obj){
            return obj.pergunta === nome
         })
     },

    perguntas: function(perg, resp){
        let response =
        {
            "question":'Pperg',
            "answer":'Prespo'
        }
        switch(perg){
            case "Qual a sua idade?":
                if(resp === "de 18 a 30"){
                    response.question = "Ótimo! Agora escolha o seu perfil:"; 
                    response.answer = ["Servidor publico", "Pensionista", "Militar", "Assalariado privado", "Autonomo", "Desempregado"]
                }else{
                    response.question  = "Ótimo! Agora escolha o seu perfil:"; 
                    response.answer = ["Aposentado", "Servidor publico", "Pensionista", "Militar", "Assalariado privado", "Autonomo", "Desempregado"];
                }
            break;
            case "Ótimo! Agora escolha o seu perfil:":
            if(resp === "Aposentado"){
                response.question = "Voce é casado?"; 
                response.answer = ["sim","não"];
            }else if(resp === "Desempregado"){
                response.question = "Voce possui bens no seu nome?"; 
                response.answer = ["casa","carro","participa de clube","não"];
            }else{
                response.question = "Voce mora com os pais?";
                response.answer = ["sim","não"];}
            break;
            case "Voce mora com os pais?":
                response.question = "Voce é casado?";
                response.answer = ["sim","não"];
            break;
            case "Voce é casado?":
                if((resp === "não") && (TEF.get("Voce mora com os pais?"))){
                        response.question = "FIM";
                        response.answer = ["FIM", "FIM"];  
                }else{
                    response.question = "Voce possui bens no seu nome?"; 
                    response.answer = ["casa","carro","participa de clube","não"];
                }
            break;
            case "Voce possui bens no seu nome?":
                response.question = "Voce já teve algum investimento?";
                response.answer = ["sim", "não"]; 

            break;
            case "Voce já teve algum investimento?":
                if(resp === "sim"){
                    response.question = "O que aconteceu com ele?";
                    response.answer = "Deu certo", "Deu errado";  
                }else{
                    response.question = "Voce ja contratou linha de credito anteriormente?";
                    response.answer = ["sim", "não"];
                 } 

            break;
            case "O que aconteceu com ele?":
                response.question = "Voce ja contratou linha de credito anteriormente?";
                response.answer = ["sim", "não"];  
            break;
            case "Voce ja contratou linha de credito anteriormente?":
                if(resp === "sim"){
                    response.question = "Qual o motivo?";
                    response.answer = "Investimento", "Pagamento de dividas";  
                }   
                else{
                    response.question = "FIM";
                    response.answer = ["FIM"];
                }

            break;
            case "Qual o motivo?":
                response.question = "Consegiu pagar em dia?";
                response.answer = "sim", "não"; 
            break;
            case "Consegiu pagar em dia?":
                response.question = "FIM";
                response.answer = ["FIM", "FIM"]; 
            break;
            default :
                response.question = "ALGO ERRADO!!!!";
                response.answer = ["ALGO ERRADO!!!!", "ALGO ERRADO!!!!"]; 
        }
        console.log('RESPONDENDO PRO JOJO>::::' +JSON.stringify(response))  ;
        return response;
    },

    respostas: function(x){
        respostas.push(x);
    },
    getResp: function(){
        return respostas;
    }
}


module.exports = TEF;
