var exports = module.exports = {};
var ref = require('ref');
var ffi = require('ffi');
var enumWindowsArray = {};
var enumWindowsTimeout;
var enumWindowsCallback;

var voidPtr = ref.refType(ref.types.void);
var stringPtr = ref.refType(ref.types.CString);

var user32 = ffi.Library('user32.dll', {
  EnumWindows : ['bool', [voidPtr, 'int32']],
  FindWindowW : ['int', ['string', 'string']],
  ShowWindow : ['int', ['int', 'int']],
  CloseWindow  : ['long', ['long']],
  GetWindowTextA  : ['long', ['long', stringPtr, 'long']],
  GetWindowTextLengthA  : ['long', ['long']],
  IsWindowVisible  : ['long', ['long']],
  FindWindowW : ['int', ['string', 'string']],
  ShowWindow : ['int', ['int', 'int']]
});

function TEXT(text){
  return new Buffer(text, 'ucs2').toString('binary');
}

exports.visableWindows = function(callback){
  enumWindowsArray = {};
  enumWindowsCallback = callback;
  user32.EnumWindows(ffi.Callback('bool', ['long', 'int32'], function(hwnd, lParam) {
    clearTimeout(enumWindowsTimeout);
    //enumWindowsTimeout = setTimeout(enumWindowsCallback,50,enumWindowsArray); // 50ms after last run, assume ended
    enumWindowsTimeout = setTimeout(enumWindowsCallback,50,enumWindowsArray); // 50ms after last run, assume ended
    if (!user32.IsWindowVisible(hwnd)) return true;
    var length = user32.GetWindowTextLengthA(hwnd);
    if (length == 0) return true;

    var buf = new Buffer(length+1);
    user32.GetWindowTextA(hwnd, buf, length+1);
    var name = ref.readCString(buf, 0);

    enumWindowsArray[hwnd] = name;

    return true;
  }), 0);
}

exports.findWindow = function(name){
  for(i=0;i<50;i++){ //ensure accurate reading, sometimes returns 0 when window does exist
    handle = user32.FindWindowW(null, TEXT(name))
    if(handle!==0){break;}
  }
  return handle;
}

exports.hideWindow = function(handle){
  if(typeof handle === 'object'){
    handle.forEach(function(e){user32.ShowWindow(e, 0);});
  }else if(typeof handle === 'number'){
    user32.ShowWindow(handle, 0);
  }else{
    Error("Handle wasn't array/number")
  }
}

exports.showWindow = function(handle){
  if(typeof handle === 'object'){
    handle.forEach(function(e){user32.ShowWindow(e, 5);});
  }else if(typeof handle === 'number'){
    user32.ShowWindow(handle, 5);
  }else{
    Error("Handle wasn't array/number")
  }
}

exports.setWindow = function(handle, state){
  if(typeof handle === 'object'){
    handle.forEach(function(e){user32.ShowWindow(e, state);});
  }else if(typeof handle === 'number'){
    user32.ShowWindow(handle, state); //use values from https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548.aspx
  }else{
    Error("Handle wasn't array/number")
  }
}

exports.closeWindow = function(handle){
  if(typeof handle === 'object'){
    handle.forEach(function(e){user32.CloseWindow(e);});
  }else if(typeof handle === 'number'){
    user32.CloseWindow(handle);
  }else{
    Error("Handle wasn't array/number")
  }
}
