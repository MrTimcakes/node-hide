var exports = module.exports = {};
var ref = require('ref');
var ffi = require('ffi');

var voidPtr = ref.refType(ref.types.void);
var stringPtr = ref.refType(ref.types.CString);

var user32 = ffi.Library('user32.dll', {
  'EnumWindows' : ['bool', [voidPtr, 'int32']],
  'FindWindowW' : ['int', ['string', 'string']],
  'ShowWindow' : ['int', ['int', 'int']],
  'GetWindowTextA'  : ['long', ['long', stringPtr, 'long']],
  'GetWindowTextLengthA'  : ['long', ['long']],
  'IsWindowVisible'  : ['long', ['long']],
  'FindWindowW' : ['int', ['string', 'string']],
  'ShowWindow' : ['int', ['int', 'int']]
});

function TEXT(text){
  return new Buffer(text, 'ucs2').toString('binary');
}

exports.findWindow = function(name){
  for(i=0;i<50;i++){ //ensure accurate reading, sometimes returns 0 when window does exist
    handle = user32.FindWindowW(null, TEXT(name))
    if(handle!==0){break;}
  }
  return handle;
}
