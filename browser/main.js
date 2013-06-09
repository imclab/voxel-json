var game = require('voxel-hello-world')({
    generate: generate,
    texturePath: '/textures/',
    playerSkin: 'substack.png',
    materialFlatColor: false,
    materials: [ 'grass', 'brick', 'dirt' ]
});

var diff = {};
window.diff = diff;

window.applyDiff = applyDiff;

function applyDiff (diff) {
    Object.keys(diff).forEach(function (key) {
        var pos = keyToPos(key);
        game.setBlock(pos, diff[key]);
    });
}

game.on('setBlock', function (pos, value) {
    diff[posToKey(pos)] = value;
});

function generate (x, y_, z) {
    var y = y_ + 25;
    return x*x + y*y + z*z < 400;
}

function posToKey (pos) { return pos.join('|') }
function keyToPos (key) { return key.split('|') }
