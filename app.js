var express = require("express");
var app = express();
var router = require("./controler/router.js");

app.use(express.static("static"));

app.get("/add",function(req,res,next){
    //呈递一个页面
    console.log(__dirname);
    res.sendFile(__dirname + "/static/add.html");
});

app.get("/doadd",router.doadd);
app.get("/all",router.all);
app.get('/del',router.delete);
app.listen(3000);