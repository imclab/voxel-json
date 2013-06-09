var game = require('voxel-hello-world')({
    generate: generate,
    texturePath: '/textures/'
});

function generate (x, y_, z) {
    var y = y_ + 25;
    return x*x + y*y + z*z < 400;
}
