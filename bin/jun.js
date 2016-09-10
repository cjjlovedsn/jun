#!/usr/bin/env node

var fs = require("fs")
var path = require("path")
var build = require("../lib/build")
var copy = require("../lib/streamCopy")
var wf = require("../lib/watchFile")
var args = process.argv.slice(2)
var packageJson = require("../package.json")

switch (args[0]){
	case "build":
	build(args[1])
		break;
	case "copy":
	copy(args[1],args[2])
		break;
	case "watch":
	wf(args[1],args[2])
		break;
	case "--help":
	console.log(`
		Commands
		build\t\t\t\t MarkDown转换为HTML文件
		copy <src> <dist>\t\t 复制文件'src' 到 'dist'文件
		watch <file> [-build]\t\t 监视文件[转换MD文件的同时监视转换后的HTML文件]
		 --help\t\t\t\t 打印帮助
		  --version\t\t\t 显示版本号`);
		break;
	case "--version":
	console.log(packageJson.version);
		break;
	default:
		break;
}
