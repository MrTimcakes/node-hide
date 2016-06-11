if(process.platform=='win32'){

var hide = require('./main.js');

var handle = hide.findWindow('Untitled - Notepad')

//hide.hideWindow(handle);
//setTimeout(function(){hide.showWindow(handle);},500);
hide.hideWindow([1115138,331240]);
setTimeout(function(){hide.showWindow([1115138,331240]);},500);

hide.visableWindows(function(data){console.log(JSON.stringify(data))});

}
