const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const marked = require('marked');
const morgan = require('morgan');
const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(bodyParser.json());

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.set('view engine', 'hbs');

app.use(function middle(request, response, next) {
  console.log('Request method:', request.method, 'Request path:', request.path);
  next();
});

app.put('/documents/:filepath', function(request, response) {
  var filepath = request.params.filepath;
  var contents = request.body.contents;
  fs.writeFile('./data/' + filepath, contents, function(err) {
    if (err) {
      response.status(500);
      response.json({ error: err.message });
    } else {
      response.json({ status: 'ok' });
    }
  });
});

app.get('/documents/:filepath/display', function(request, response) {
  var filepath = request.params.filepath;
  fs.readFile('./data/' + filepath, function(err, buffer) {
    if (err) {
      response.status(500);
      response.send('Couldn\'t read the file ' + filepath + ' because ' + err.message);
    } else {
      response.render('page.hbs', {
        title: filepath,
        markup: marked(buffer.toString())
      });
    }
  });
});

app.get('/documents/:filepath', function(request, response) {
  var filepath = request.params.filepath;
  fs.readFile('./data/' + filepath, function(err, buffer) {
    if (err) {
      response.status(500);
      response.json({ error: err.message });
    } else {
      response.json({
        filepath: filepath,
        contents: buffer.toString()
      });
    }
  });
});

app.get('/documents', function(request, response) {
  fs.readdir('./data', function(err, entries) {
    if (err) {
      response.status(500);
      response.json({ error: err.message });
    } else {
      response.json(entries);
    }
  });
});

app.delete('/documents/:filepath', function(request, response) {
  var filepath = request.params.filepath;
  fs.unlink('./data/' + filepath, function(err) {
    if (err) {
      response.status(500);
      response.json({ error: err.message });
    } else {
      response.json({ status: 'ok' });
    }
  });
});

app.listen(3000, function() {
  console.log('I am listening on 3000.');
});
