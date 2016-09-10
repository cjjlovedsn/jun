var fs = require("fs")
var path = require("path")
var marked = require("marked")
var opener = require("opener")
var tmpStr = fs.readFileSync(path.join(__dirname, "template.html"), "utf8")
module.exports = function() {
	var args = arguments
	var filepath = ""
	if(typeof args[0] === "string") {
		filepath = args[0]
	} else if(typeof args[0] === "object") {
		filepath = args[0].path
	}
	fs.readFile(filepath, "utf8", function(err, data) {
		if(err) {
			return args[0].callback(err)
		}
		data = marked(data)
		data = tmpStr.replace("Jun_Chen", data)
		var pfp = path.parse(filepath);
		var distPath = path.join(pfp.dir,pfp.name) + ".html"
		fs.writeFile(distPath, data, function(err) {
			if(err) {
				return args[0].callback(err)
			}
			console.log("MarkDown To HTML Complete")
			if(typeof args[0] === "object") {
				if(args[0].openfile) {
					opener(distPath)
				}else if(typeof args[0].callback ==="function") {
					args[0].callback(null, distPath)
				}
			}
		})
	})

}