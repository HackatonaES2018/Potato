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
        if (){
            
        }
        chat.push(data);
        _count+=1;
        updateScreen();
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