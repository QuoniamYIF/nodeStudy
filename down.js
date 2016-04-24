var http = require('http'),
	fs = require('fs');

function getPic(url, picdir, picname){
	http
	.get(url, function(res){
		var body = "";
		res.setEncoding("binary"); 

		res
		.on('data', function(chunk){
			body += chunk;
		})
		.on('end', function(){
			if(res.statusCode === 200) {
				try {
					fs.writeFile(picdir + '/' + picname, body, 'binary', function(err){
	 					if(err)
	 						printError(err);
					});
				} catch(err) {
					printError(err);
				}
			} else {
				printError({
					message: http.STATUS_CODES[res.statusCode]
				});
			}
		});
	})
	.on("error", printError);
}

function printError(e){
	console.error(e.message);
}

function change(url){
	var nurl = url.split('/');
	picName = nurl[nurl.length-1].split('.')[0];
	return picName;
}

exports.getPN = change;
exports.getP = getPic;
exports.printE = printError;