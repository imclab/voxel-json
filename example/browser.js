var game = require('voxel-hello-world')({
    generate: generate,
    texturePath: '/textures/',
    playerSkin: 'substack.png',
    materialFlatColor: false,
    materials: [ 'grass', 'brick', 'dirt' ]
});
var vjson = require('../')(game);
var stream = require('shoe')('/sock');

window.addEventListener('keydown', function (ev) {
    if (ev.which === 'Z'.charCodeAt(0)) {
        stream.write(JSON.stringify({
            path: location.pathname.slice(1) || 'index',
            data: vjson.toJSON()
        }) + '\n');
    }
});

function generate (x, y_, z) {
    var y = y_ + 25;
    return x*x + y*y + z*z < 400;
}

function posToKey (pos) { return pos.join('|') }
function keyToPos (key) { return key.split('|') }
