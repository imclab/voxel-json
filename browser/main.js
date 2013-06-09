var game = require('voxel-hello-world')({
    generate: generate,
    texturePath: '/textures/',
    playerSkin: 'substack.png',
    materialFlatColor: false,
    materials: [ 'grass', 'brick', 'dirt' ]
});

function generate (x, y_, z) {
    var y = y_ + 25;
    return x*x + y*y + z*z < 400;
}
