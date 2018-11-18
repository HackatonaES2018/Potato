var axios = require ('axios');

TEF = {

    teste: async function(pos){
        var x = await axios.post('sb-api.portocred.com.br/credito-pessoal-demo/v1/propostas',data1);
        sleep(5000);
        return x;
    }
}
var data1 = {
    "cliente":
    {
        "nome": "NINA FRANCISCA VIANA",
        "cpf": "03028799782",
        "data-nascimento": "1994-08-14",
        "email": "ninafranciscaviana@djapan.com.br",
        "escolaridade": "SUPERIOR",
        "estado-civil": "SOLTEIRO",
        "sexo": "FEMININO",
        "negativado": "NAO",
    },
    "proposta":
    {
        "valor-desejado": 1500,
        "data-primeira-parcela": "2018-12-18",
        "seguro": "SIM",
        "produto": "CARNE"
    },
    "dados-adicionais":
     [
        {
            "campo": "MOTIVO_EMPRESTIMO",
            "valor": "PAGAR CONTAS"
        }
    ]
 };
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }


module.exports = TEF;
