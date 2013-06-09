var game = require('voxel-hello-world')({
    generate: generate,
    texturePath: '/textures/',
    playerSkin: 'substack.png',
    materialFlatColor: false,
    materials: [ 'grass', 'brick', 'dirt' ]
});
var vjson = require('../')(game);

var hyperquest = require('hyperquest');
var concat = require('concat-stream');
var dataHref = '/data/' + (location.pathname.slice(1) || 'default') + '.json';

hyperquest(dataHref).pipe(concat(function (body) {
    try {
        var world = JSON.parse(body);
        vjson.apply(world);
    }
    catch (e) {}
}));

window.addEventListener('keydown', function (ev) {
    if (ev.which === 'Z'.charCodeAt(0)) {
        var hq = hyperquest.post(dataHref);
        hq.end(JSON.stringify(vjson.toJSON()) + '\n');
    }
});

function generate (x, y_, z) {
    var y = y_ + 25;
    return x*x + y*y + z*z < 400;
}

function posToKey (pos) { return pos.join('|') }
function keyToPos (key) { return key.split('|') }
