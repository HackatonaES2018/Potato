$('document').ready(startChat)

var chat = [];

var _count = 0

function startChat(){
    var object = {}
    object.question = "PotatoFirstGroup"
    object.answer = "PotatoFirstGroup"
    
    $.get("http://localhost:5000/chat", object, function (response) {
        response = JSON.parse(response);
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
        if (element == _count){
            chat[index].chosen = answer;
            object.question = chat[index].question;
            object.answer = chat[index].chosen;
            break;
        }        
    }

    $.post("http://localhost:5000/chat", object, function (response) {
        var data = {
            count: _count,
            question: response.question,
            answer: response.answer
        }
        chat.push(data);
        _count+=1;
    });

    updateScreen()
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