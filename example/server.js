var http = require('http');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
mkdirp.sync(__dirname + '/static/data');

var ecstatic = require('ecstatic');
var staticDir = {
    texture: ecstatic({
        root: require('painterly-textures')(),
        baseDir: '/textures'
    }),
    site: ecstatic({
        root: __dirname + '/static',
    }),
    data: ecstatic({
        root: __dirname + '/static/data',
        baseDir: '/data',
        cache: 0
    })
};

var server = http.createServer(function (req, res) {
    if (req.method === 'POST' && /^\/data\/[\w-]+\.json$/.test(req.url)) {
        var file = path.join(__dirname, 'static', req.url);
        req.pipe(fs.createWriteStream(file)).on('close', function () {
            console.log('wrote to ' + file);
            res.end('ok\n');
        });
    }
    else if (/^\/[\w-]+$/.test(req.url)) {
        req.url = '/';
        staticDir.site(req, res);
    }
    else if (RegExp('^/textures/').test(req.url)) {
        staticDir.texture(req, res);
    }
    else if (RegExp('^/data/').test(req.url)) {
        staticDir.data(req, res);
    }
    else staticDir.site(req, res);
});
server.listen(5005);
