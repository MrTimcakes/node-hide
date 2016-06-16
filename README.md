# node-hide
[![Travis](https://img.shields.io/travis/MrTimcakes/node-hide.svg?style=flat-square)](https://travis-ci.org/MrTimcakes/node-hide)
[![NPM Status](https://img.shields.io/npm/v/node-hide.svg?style=flat-square)](https://www.npmjs.com/package/node-hide)

Node-hide is an NPM Module that handles all the quirks of hiding and showing windows for you.

Internally node-hide uses "user32.dll" via ffi and so is, for the time being, Windows only.

## Quick Start

### Install Prerequisites

Make sure you've installed all the [necessary build
tools](https://github.com/TooTallNate/node-gyp#installation) for your 'node-gyp', then invoke:

``` bash
$ npm install node-hide
```

Note: In order to compile with electron I was required to use electron-rebuild with
`.\node_modules\.bin\electron-rebuild.cmd -w sqlite3 -p`

####  Examples

``` js
var hide = require('node-hide');

var handle = hide.findWindow('Untitled - Notepad') //Track Notepad's ID to Hide it Later

hide.hideWindow(handle); //Hide Notepad, I can also take an array of handles, e.g. [1115138,331240]
setTimeout(function(){
  hide.showWindow(handle); //Show Notepad After a 1 Second Timeout
},1000);

setTimeout(function(){
  hide.closeWindow(handle); //close Notepad After a 5 Second Timeout
},5000);


hide.visableWindows(function(data){
  console.log(JSON.stringify(data)) //List all the Visable Windows
});
//Output: {"65846":"Program Manager","132154":"Google - Google Chrome",
//         "199568":"GitHub","331240":"Untitled - Notepad","1115138":"npm - Google Chrome"}
```

### Support

If you're having any problem, please [raise an issue](https://github.com/MrTimcakes/node-hide/issues/new) on GitHub.

### Contributors

Thanks to [Shawn Rakowski](http://stackoverflow.com/users/3399439/shawn-rakowski) for the initial help on Stack Overflow

### License

node-hide is free Open-Source software, and is released under the GPL-3.0 License, further information can be found under the terms specified in the [license](https://github.com/MrTimcakes/node-hide/blob/master/LICENSE).
