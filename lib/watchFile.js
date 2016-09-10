var fs = require("fs")
var path = require("path")
var build = require("./build")
var bs = require("browser-sync").create("My server")
module.exports = function(src, bmd) {
	if(bmd === "-build") {
		build({
			path: src,
			openfile: false,
			callback: function(err, dist) {
				if(err) {
					throw err
				}
				bs.init({
					server: {
						baseDir: path.parse(dist).dir,
						index: path.parse(dist).base
					},
					ui: {
						port: 8080
					}
				})
				bs.reload(dist)
			}
		})
	}
	//	bs.watch("*.html").on("change",bs.reload)
	fs.watchFile(src, {
		persistent: true,
		interval: 500
	}, function(curr, prev) {
		if(bmd === "-build") {
			console.log("开始转换...")
			build({
				path: src,
				openfile: false,
				callback: function(err, dist) {
					if(err) {
						return console.log("转换MD失败！")
					}
					bs.reload(dist)
				}
			})
		} else if(typeof bmd === "function") {
			console.log("监听中...");
			bmd(curr, prev)
		}
	})
}

