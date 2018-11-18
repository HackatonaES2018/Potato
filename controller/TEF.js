
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
            "perguntas":'Pperg',
            "respostas":'Prespo'
        }
        switch(perg){
            case "PotatoFirstGroup":
                response.perguntas = "Qual a sua idade?";
                response.respostas = ["de 18 a 30", "de 30 a 40.", "de 40 a 50.", "de 50 a 60."];
            break;
            case "Qual a sua idade?":
            console.log("entoruuuu")
                if(resp === "de 18 a 30"){
                    response.perguntas = "Ótimo! Agora escolha o seu perfil:"; 
                    response.respostas = ["Servidor publico", "Pensionista", "Militar", "Assalariado privado", "Autonomo", "Desempregado"]
                }else{
                    response.perguntas  = "Ótimo! Agora escolha o seu perfil:"; 
                    response.respostas = ["Aposentado", "Servidor publico", "Pensionista", "Militar", "Assalariado privado", "Autonomo", "Desempregado"];
                }
            break;
            case "Ótimo! Agora escolha o seu perfil:":
            if(resp === "Aposentado"){
                response.perguntas = "Voce é casado?"; 
                response.respostas = ["sim","não"];
            }else if(resp === "desempregado"){
                response.perguntas = "Voce possui bens no seu nome?"; 
                response.respostas = ["casa","carro","participa de clube","não"];
            }else{
                response.perguntas = "Voce mora com os pais?";
                response.respostas = ["sim","não"];}
            break;
            case "Voce mora com os pais?":
                response.perguntas = "Voce é casado?";
                response.respostas = ["sim","não"];
            break;
            case "Voce é casado?":
                if((resp === "não") && (TEF.get("Voce mora com os pais?"))){
                        response.perguntas = "FIM";
                        response.respostas = "FIM";  
                }else{
                    response.perguntas = "Voce possui bens no seu nome?"; 
                    response.respostas = ["casa","carro","participa de clube","não"];
                }
            break;
            case "Voce possui bens no seu nome?":
                response.perguntas = "Voce já teve algum investimento?";
                response.respostas = "sim", "não"; 

            break;
            case "Voce já teve algum investimento?":
                if(resp === "sim"){
                    response.perguntas = "O que aconteceu com ele?";
                    response.respostas = "Deu certo", "Deu errado";  
                }else{
                    response.perguntas = "Voce ja contratou linha de credito anteriormente?";
                    response.respostas = "sim", "não";
                 } 

            break;
            case "O que aconteceu com ele?":
                response.perguntas = "Voce ja contratou linha de credito anteriormente?";
                response.respostas = "sim", "não";  
            break;
            case "Voce ja contratou linha de credito anteriormente?":
                if(resp === "sim"){
                    response.perguntas = "Qual o motivo?";
                    response.respostas = "Investimento", "Pagamento de dividas";  
                }   {
                response.perguntas = "FIM";
                response.respostas = "FIM"; }

            break;
            case "Qual o motivo?":
                response.perguntas = "Consegiu pagar em dia?";
                response.respostas = "sim", "não"; 
            break;
            case "Consegiu pagar em dia?":
                response.perguntas = "FIM";
                response.respostas = "FIM"; 
            break;
            default :
                response.perguntas = "ALGO ERRADO!!!!";
                response.respostas = "ALGO ERRADO!!!!"; 
        }
        console.log(response);
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
