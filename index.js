var http = require('http'),

	repl=require('repl'),
	app = require('./app');


http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});

var promt = repl.start({prompt: 'aws> '});
