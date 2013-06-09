module.exports = function (game) {
    var diff = exports.listen(game);
    return {
        diff: diff,
        toJSON: function () {
            return {
                diff: diff
            };
        },
        applyDiff: function (d) {
            return apply(game, diff);
        },
        apply: function (json) {
            return apply(game, json);
        }
    };
};

exports.listen = listen;
function listen (game) {
    var diff = {};
    game.on('setBlock', function (pos, value) {
        diff[posToKey(pos)] = value;
    });
    return diff;
};

exports.apply = apply
function apply (game, json) {
    return applyDiff(game, json.diff);
}

exports.applyDiff = applyDiff
function applyDiff (game, diff) {
    Object.keys(diff).forEach(function (key) {
        var pos = keyToPos(key);
        game.setBlock(pos, diff[key]);
    });
}

function posToKey (pos) { return pos.join('|') }
function keyToPos (key) { return key.split('|') }
