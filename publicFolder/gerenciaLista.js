$('document').ready(initialize());

var chat;

var _count;

function initialize() {
    chat = [];
    _count = 0;

    $('#send').on('click', createQuestion);

    chat.length == 0 ? startChat() : null;
};

function startChat(){
    var object = {}
    object.question = "PotatoFirstGroup"
    object.answer = "PotatoFirstGroup"
    
    $.post("http://localhost:8080/chat/inicia", object, function (response) {
        // response = JSON.parse(response);
        console.log(response)
        var data = {
            count: _count,
            question: response.question,
            answer: response.answer,
            chosen: null
        };
        chat.push(data);
        _count+=1;
        updateScreen();
    });

}


function createQuestion(){
    var answer = $('#answer').val();

    var object = {}
    
    for (let index = 0; index < chat.length; index++) {
        const element = chat[index].count;
        if (element == chat.length-1){
            chat[index].chosen = answer;
            object.question = chat[index].question;
            object.answer = chat[index].chosen;
            break;
        }        
    }

    $.post("http://localhost:8080/chat", object, function (response) {
        var data = {
            count: _count,
            question: response.question,
            answer: response.answer
        }
        if (data.question === "FIM"){
            object = {
                "cliente": {
                  "nome": "NINA FRANCISCA VIANA",
                  "cpf": "03028799782",
                  "data-nascimento": "1994-08-14",
                  "email": "ninafranciscaviana@djapan.com.br",
                  "redes-sociais": [
                    {
                      "nome": "FACEBOOK",
                      "conta": "nina.francisca.viana"
                    }
                  ],
                  "escolaridade": "SUPERIOR",
                  "documentos": [
                    {
                      "numero": "0098119878",
                      "tipo": "RG",
                      "uf": "RJ"
                    }
                  ],
                  "estado-civil": "SOLTEIRO",
                  "sexo": "FEMININO",
                  "endereco-residencial": {
                    "logradouro": "RUA DAS RENDEIRAS",
                    "numero": "325",
                    "complemento": "apto 202",
                    "bairro": "BARRA DA TIJUCA",
                    "cidade": "RIO DE JANEIRO",
                    "uf": "RJ",
                    "cep": "20715430"
                  },
                  "negativado": "NAO",
                  "contas-bancarias": [
                    {
                      "codigo-banco": "0237",
                      "tipo-conta": "CONTA_CORRENTE",
                      "agencia": "0325",
                      "conta": "65429"
                    }
                  ],
                  "telefones": [
                    {
                      "tipo": "CELULAR",
                      "ddd": "21",
                      "numero": "985214545"
                    }
                  ],
                  "situacao-profissional": {
                    "classe-profissional": "ENGENHEIRO",
                    "nome-empresa": "INDUSTRIAS STARK",
                    "renda": 5200,
                    "endereco-comercial": {
                      "logradouro": "AV PRINCIPAL",
                      "numero": "1200",
                      "complemento": "",
                      "bairro": "CENTRO",
                      "cidade": "RIO DE JANEIRO",
                      "uf": "RJ",
                      "cep": "20715550"
                    }
                  }
                },
                "proposta": {
                  "valor-desejado": 1500,
                  "data-primeira-parcela": "2018-12-18",
                  "seguro": "SIM",
                  "produto": "CARNE"
                },
                "dados-adicionais": [
                  {
                    "campo": "MOTIVO_EMPRESTIMO",
                    "valor": "PAGAR CONTAS"
                  }
                ]
              }
            $.post("http://localhost:8080/propostas", object, function (response) {

                var data = {    
                    taxa: response.cet.taxa,
                    prazo: response.cet.prazo
                }
                aux = "<ul><li>Taxa = " + data.taxa+ "</li><li> Prazo = " + data.prazo + "</li></ul>"
                $('#propostas').html(aux);
            }); 
        }
        else{
            chat.push(data);
            _count+=1;
            updateScreen();
        }
    });

    
}

function updateScreen(){
    var list  = "<ul>";

    chat.forEach(element => {
        var aux = ""
        element.answer.forEach(answer => {
            aux += answer + "<br>"
        })
        list+="<li id=\"" + element.count + "\">" + element.question + "<br>" + aux + "</li>"
        if (element.chosen !== null){
            "<li id=\"answer" + element.count + "\">" + element.answer + "</li>"
        }
    });
    

    list += "</ul>"

    $('#list').html(list);
    //document.getElementById("list").innerHTML = list;

}