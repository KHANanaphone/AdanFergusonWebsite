var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src');

app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
   res.render('index', {page: 'home'});
});

app.get('/:id', function (req, res) {
   res.render('index', {page: req.param('id')});
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
