# voxel-json

capture player edits into json voxel diffs for [voxeljs](http://voxeljs.com)

# example

``` js
var game = require('voxel-hello-world')();
var vjson = require('../')(game);

window.addEventListener('keydown', function (ev) {
    if (ev.which === 'Z'.charCodeAt(0)) {
        console.log(JSON.stringify(vjson.toJSON()));
    }
});
```

Now press the `z` key in-game after making some edits.
You'll get a JSON blob. You can then apply that JSON blob to make the same
edits again elsewhere:

``` js
vjson.apply(jsonBlob)
```

# methods

``` js
var voxelJSON = require('voxel-json')
```

## var vjson = voxelJSON(game)

Register listeners on `game` and return a new `vjson` instance.

## vjson.apply(json)

Apply a complete `json` object. `json` should have `diff` and later other
parameters like terrain seed information.

## vjson.applyDiff(diff)

Apply just a `diff` to the `game`.

## vjson.toJSON()

Return a json object with the diff and terrain seed that can be sent to
`JSON.stringify()`.

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-json
```

Compile for the browser with [browserify](http://browserify.org).

# license

MIT
