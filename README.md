# node-hide
[![Build Status](https://travis-ci.org/MrTimcakes/node-hide.svg?branch=master)](https://travis-ci.org/MrTimcakes/node-hide)
[![NPM status](https://nodei.co/npm/node-hide.png?compact=true)](https://www.npmjs.com/package/node-hide)

Node-hide is an NPM Module that handles all the quirks of hiding and showing windows for you.

Internally node-hide uses "user32.dll" via ffi and so is, for the time being, Windows only.

## Quick Start

### Install Prerequisites

Make sure you've installed all the [necessary build
tools](https://github.com/TooTallNate/node-gyp#installation) for your 'node-gyp', then invoke:

``` bash
$ npm install node-hide
```

####  Examples

``` js
var hide = require('node-hide');

var handle = hide.findWindow('Untitled - Notepad') //Track Notepad's ID to Hide it Later

hide.hideWindow(handle); //Hide Notepad
setTimeout(function(){
  hide.showWindow(handle); //Show Notepad After a 1 Second Timeout
},1000);


hide.visableWindows(function(data){
  console.log(JSON.stringify(data)) //List all the Visable Windows
});
//Output: {"65846":"Program Manager","132154":"Google - Google Chrome","199568":"GitHub","331240":"Untitled - Notepad","1115138":"npm - Google Chrome"}
```
