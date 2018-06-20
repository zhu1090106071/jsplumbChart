var express = require('express');
var app = express();
var fs = require('fs');

// 静态托管static文件
app.use(express.static("static"));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/demo.html');
})

// 获取模板数据
app.get('/getTmp',function(req,res){
	fs.readFile("./static/data/tmp.json",'UTF-8',function(err,data){
		res.end(data);
	})
})

// 添加模板数据
app.get('/addList',function(req,res){
	fs.readFile("./static/data/tmp.json",'UTF-8',function(err,data){
		data = JSON.parse(data);
		data.tmp.push(req.query);
		var writerStream = fs.createWriteStream('./static/data/tmp.json');
		data = JSON.stringify(data);
		writerStream.write(data,'UTF-8');
		res.end(data);
	})
})

app.listen(8080,function(){
	console.log("服务启动成功，端口号8080")
})
