var url = require("url");
var db = require("../models/db.js");


exports.doadd = function(req,res,next){
    //得到用户表单信息
    var queryobj = url.parse(req.url,true).query;

    //学号不能冲突
    db.findAll("student",{"xuehao" : queryobj.xuehao},{},function(err,result){
        console.log(result);//查询到的结果,如果没有重复返回的就是一个空数组
        if(err){
            res.json({"jieguo" : -1});
            return;
        }
        //防止学号冲突
        if(result.length > 0){
            res.json({"jieguo" : -2});
            return;
        }

        //插入数据
        db.insertone("student",queryobj,function(err,result){

            if(err){
                res.json({"jieguo" : -1});
                return;
            }
            res.json({"jieguo" : 1});
        });
    });
}

//读取全部学生
exports.all = function(req,res,next) {
    db.findAll("student",{},{"xuehao" : -1},function(err,jieguo){
        res.json({"jieguo" : jieguo});
    });
}


//删除操作
exports.delete = function(req,res,next){

    db.deleteThis('student',{},{"xuehao": -1},function(err,jieguo){
        res.json({"jieguo" : jieguo});
    })
}

