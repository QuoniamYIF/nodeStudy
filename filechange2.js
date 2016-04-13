var fs = require('fs'),
      images = require('images');

function copyandDeal(src, dst) {
  fs.mkdir(dst, function(){
    fs.readdir(src, function(err, paths){
      if(err){
        throw err;
      }
      paths.forEach(function(path, index){
        console.log(index);
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        fs.stat( _src, function(err, st){
        if(err){
          throw err;
        }

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

        } else if(st.isDirectory()) {
          fs.mkdir(_dst, function(){
            copyandDeal(_src, _dst);
          });
        }
        });
      });
    });
      // EventProxy = require('eventproxy');

// var ep = new EventProxy();

// var fileCount = 0;

// // ep.all('path','dir', function (path, dir) {
// //   // console.log(path);
// //   // console.log(dir);
// // });

// // ep.on('isDirectory', function(st))

// function fileC(dir){
//   fs.readdir(dir, function(err, paths){
//     var count = paths.length;
//     paths.forEach(function(path){
//       var _src = dir + '/' + path;
//       fs.stat( _src, function(err, st){
//         if(st.isDirectory()){
//           fileCount++;
//         }
//         count --;
//         if(count <= 0) {
//           console.log(fileCount);
//         }
//       })
//     });
//   });
// }
  });
}

// copyandDeal(process.argv.slice(2)[0], process.argv.slice(2)[1]);
fileC(process.argv.slice(2)[0]);