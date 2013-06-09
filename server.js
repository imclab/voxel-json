var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');
var filesd = {
    site: ecstatic(__dirname + '/static'),
    textures: ecstatic({
        root: require('painterly-textures')(),
        baseDir: '/textures/'
    })
};

var server = http.createServer(function (req, res) {
    if (RegExp('^/textures/').test(req.url)) {
        filesd.textures(req, res);
    }
    else filesd.site(req, res)
});
server.listen(5005);
