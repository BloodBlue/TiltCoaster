var express = require('express'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname + '/serve')));

app.listen(port, function(){
    console.log('Listening at port', port);
});