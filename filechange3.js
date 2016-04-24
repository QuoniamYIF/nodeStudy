var fs = require('fs'),
      images = require('images'),
      EventProxy = require('eventproxy');

var stat = fs.stat,
      comCount = 5,
      imCount = 0,
      dArray = new Array(),
      average = 1, 
      dst;

var ep = new EventProxy();

function fileC(dir){
  fs.readdir(dir, function(err, paths){
    var count = paths.length;
    paths.forEach(function(path){
      var _src = dir + '/' + path;
      fs.stat( _src, function(err, st){
        if(st.isFile()){
          imCount++;
        }
        count --;
        if(count <= 0) {
          ep.emit('imCount', imCount);
        }
      })
    });
  });
}

function copyandDeal(src, dst){
  average = Math.floor(imCount / 5);
  for(var i = 1;i < arguments.length; i ++){
    fs.mkdirSync(arguments[i]);
    dArray.push(arguments[i]);
  }
  fs.readdir(src, function(err, paths){
    if(err) 
      throw err;
    paths.forEach(function(path, index){
      if(index < average) {
        dst = dArray[0];
      }
      else if(index >= average && index < average*2) {
        dst = dArray[1];
      }
      else if(index >= average*2 && index < average*3) {
        dst = dArray[2];
      }
      else if(index >= average*3 && index < average*4) {
        dst = dArray[3];
      }
      else {
        dst = dArray[4];
      }

      var _src = src + '/' + path;
      var _dst = dst + '/' + path;
      stat(_src, function(err, st){
        if(err)
          throw err;
        if(st.isFile()){
          var img = images(_src);
          var width = img.width(); 
          var height = img.height(); 
          var scaleCo = 800/height;

          img                                                
          .width(scaleCo * width)
          .height(scaleCo * height)                           
          .save(_dst,  {                        
            quality : 100                               
          });
        }
      })
    });
  });
}

fileC(process.argv.slice(2)[0]);
ep.on('imCount', function(imCount){
  copyandDeal(
    process.argv.slice(2)[0], 
    'pic2',
    'pic3',
    'pic4',
    'pic5',
    'pic6'
  );
});