var fs = require( 'fs' ),
      images = require("images"),
      count1 = 0,
      count2 = 0;

stat = fs.stat;
fs.mkdirSync("test");

function createTempfolder(argv){
    // if(process.argv.slice[2])
    var savePath;
    if(count1 == 0) {
        savePath = __dirname + '/' + 'test';
        count1 ++;
    } else {
        savePath = __dirname + '/' + 'test' + '/' + argv[1];
        fs.mkdirSync(savePath);
    }

    deal(argv[0], savePath);
}

function deal(src, pathS){
    fs.readdir(src, function(err, paths){
        if(err){
            throw err;
        }

        paths.forEach(function(path){
            console.log("path:" + path);
            var _src = src + '/' + path;
            stat(_src, function(err, st){
                if(err) {
                    throw err;
                }

                if(st.isFile()){
                    var img = images(_src);
                    var width = img.width(); 
                    var height = img.height(); 
                    var bi = 800/width;

                    img                                                
                    .width(bi * width)
                    .height(bi * height)                           
                    .save(pathS + '/' + path, {                        
                        quality : 100                               
                    });
                } else if(st.isDirectory()){
                    console.log("src:" +_src);
                    createTempfolder([_src, path]);
                    // createTempfolder(src);
                }
            });
        });
    });
}

function copy( src, dst ){
// 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;       

            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }

                if( st.isFile() ){
                    readable = fs.createReadStream( _src );
                    writable = fs.createWriteStream( _dst );  
                    readable.pipe( writable );
                }
                else if(st.isDirectory() ){
                    exists([_src, _dst]);
                }
            });
        });
    });
};

function exists(argv){
    console.log(argv);
    fs.exists(argv[1], function( exists ){
        // 已存在
        if( exists ){
            if(count2 == 0) {
                copy('./test', argv[1]);
                count2 ++;
            } else {
                copy(argv[0], argv[1]);
            }
        }
        // 不存在
        else{
            fs.mkdir(argv[1], function(){
                if(count2 == 0) {
                    copy('./test', argv[1]);
                    count2 ++;
                } else {
                    copy(argv[0], argv[1]);
                }
            });
        }
    });
};
// 复制目录
createTempfolder(process.argv.slice(2));
exists(process.argv.slice(2));

// var exec = require('child_process').exec,child;

// child = exec('rm -rf test',function(err,out) { 

//   console.log(out); err && console.log(err); 

// });