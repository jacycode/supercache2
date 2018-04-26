var express = require('express');
var app = express();


app.use(express.static(__dirname));

app.get("/appcache.manifest", function(req, res){
    res.header("Content-Type", "text/cache-manifest");
    res.end("CACHE MANIFEST");
});

//index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/appcache.html');
});


app.listen(6607, function() {
    console.log('http://localhost:6607');
});