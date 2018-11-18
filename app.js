var express = require('express');

var path = require('path');

var app = express();

var port = 8008;

app.get('/chat', function(req, res, next){
    res.sendFile(path.join(__dirname+'/publicFolder/chat.html'));
});

app.listen(port);

app.use(express.static(__dirname+'/publicFolder'))

console.log('pasosu aqui')