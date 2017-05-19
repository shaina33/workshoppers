// MAKE IT MODULAR
// program.js
var mymodule = require('./mymodule.js');
mymodule(process.argv[2], process.argv[3], function(err, data) {
    if (err) {
        console.err(err);
    }
    for (var i=0; i<data.length; i++) {
        console.log(data[i]);
    }
});
// mymodule.js
var fs = require('fs');
var path = require('path');
module.exports = function (dir, ext, callback) {
    var ext = '.' + ext;
    fs.readdir(dir, function (err, list) {
        if (err) {
            return callback(err);
        }
        var fileArray = [];
        for (var i=0; i<list.length; i++) {
            if (path.extname(list[i]) === ext) {
                fileArray.push(list[i]);
            }
        }
        return callback(null, fileArray);
    });
}

// HTTP CLIENT
// program.js
var http = require('http');
http.get(process.argv[2], function(response) {
    response.setEncoding("utf8");
    response.on("data", function(data) {
        console.log(data);
    });
    response.on("error", function(error) {
        console.error(error);
    })
})

// HTTP COLLECT
// program.js - Solution #1
var http = require('http');
http.get(process.argv[2], function(response) {
    var allData = '';
    response.setEncoding("utf8");
    response.on("data", function(data) {
        allData += data;
    });
    response.on("end", function() {
        console.log(allData.length);
        console.log(allData);
    })
    response.on("error", function(error) {
        console.error(error);
    })
})
// program.js - Solution #2
var http = require('http');
var bufferList = require('bl');
http.get(process.argv[2], function(response) {
    response.pipe(bufferList(function (err, data) {
        if (err) {
            console.error(err);
        }
        data = data.toString();
        console.log(data.length);
        console.log(data);
    }))
})

// JUGGLING ASYNC
// program.js
var http = require('http');
var bufferList = require('bl');
var results = [];
var count = 0;

function getResponse(URLindex) {
    http.get(process.argv[URLindex+2], function(response) {
        response.pipe(bufferList(function (err, data) {
            if (err) {
                return console.error(err);
            }
            results[URLindex] = data.toString();
            count++;
            if (count === 3) {
                for (var i=0; i<3; i++) {
                    console.log(results[i]);
                }
            }
        }))
    })
}

for (var i=0; i<3; i++) {
    getResponse(i);
}

// TIME SERVER
// program.js
var net = require('net');
var port = process.argv[2];
var server = net.createServer( function(socket) {
    var date = new Date();
    function zeroFill(num) {
      if (num < 10) {
        return '0' + num;
      } else {
        return num.toString();
      }
    }
    var data = (date.getFullYear()) + '-' 
        + zeroFill(date.getMonth()+1) + '-' 
        + zeroFill(date.getDate()) + ' ' 
        + zeroFill(date.getHours()) + ":" 
        + zeroFill(date.getMinutes()) + '\n';
    socket.end(data);
});
server.listen(port);

// HTTP FILE SERVER
// program.js
var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var path = process.argv[3];
var server = http.createServer(function callback(request, response) {
    response.writeHead(200, {'content-type': 'text/plain'});
    fs.createReadStream(path).pipe(response);
});
server.listen(port);

// HTTP UPPERCASERER
// program.js
var http = require('http');
var map = require('through2-map');
var port = process.argv[2];
var server = http.createServer(function callback(request, response) {
    if (request.method === 'POST') {
        response.writeHead(200, {'content-type': 'text/plain'});
        request.pipe(map(function (data) {
            return data.toString().toUpperCase();
        })).pipe(response);
    }
});
server.listen(port);

// HTTP JSON API SERVER
// program.js
var http = require('http');
var url = require('url');
var server = http.createServer(function callback(request, response) {
    if (request.method === 'GET') {
        var parsedURL = url.parse(request.url, true);
        var date = new Date(parsedURL.query.iso);
        var route = parsedURL.pathname;
        if (route === '/api/parsetime') {
            var output = {  hour: date.getHours(),
                            minute: date.getMinutes(),
                            second: date.getSeconds()
                         };
        } else if (route === '/api/unixtime') {
            var output = {unixtime: date.getTime()};
        }
        if (output) {
            response.writeHead(200, {'content-type': 'application/json'});
            response.end(JSON.stringify(output));
        }
    }
});
server.listen(process.argv[2]);