var http = require('http');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
mkdirp.sync(__dirname + '/data');

var ecstatic = require('ecstatic');
var filesd = {
    site: ecstatic(__dirname + '/static'),
    textures: ecstatic({
        root: require('painterly-textures')(),
        baseDir: '/textures/'
    })
};

var server = http.createServer(function (req, res) {
    if (/^\/[\w-]+$/.test(req.url)) {
        req.url = '/';
        filesd.site(req, res);
    }
    else if (RegExp('^/textures/').test(req.url)) {
        filesd.textures(req, res);
    }
    else filesd.site(req, res)
});
server.listen(5005);

var shoe = require('shoe');
var split = require('split');
var through = require('through');

var sock = shoe(function (stream) {
    stream.pipe(split()).pipe(through(function (line) {
        try { var msg = JSON.parse(line) }
        catch (e) { return }
        if (!/^[\w-]+$/.test(msg.path)) return;
        var file = path.join(__dirname, 'data', msg.path + '.json');
        
        fs.writeFile(file, JSON.stringify(msg.data), function (err) {
            if (err) console.error(err)
            else console.log('wrote to ' + file);
        });
    }));
});
sock.install(server, '/sock');
