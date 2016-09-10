var fs = require("fs");
module.exports = function(src,dist){
	var totalSize = fs.statSync(src).size
	var currentSize = 0
	var rate = 0
	//创建一个可读流
	var readStream = fs.createReadStream(src)
	//创建一个可写流
	var writeStream = fs.createWriteStream(dist)
	//监听可读流data事件
	readStream.on("data",function(chunk){
		writeStream.write(chunk)
		currentSize += chunk.length
		var nRate = parseInt(currentSize/totalSize*100)
		if ((nRate-rate)%10==0&&nRate>rate) {
			rate = nRate
			console.log("progress: "+nRate+"%")
		}
	})
	//监听可读流的 end 事件
	readStream.on("end",function(){
		// 当数据读取操作完毕，一定要记得手动关闭可写流
		writeStream.end()
		console.log("copy complete. filePath ("+dist+")")
	})
}
