//把恶心的数据库操作，全部封装到这里
//mongodb的驱动
var MongoClient = require('mongodb').MongoClient;
var dataurl = 'mongodb://localhost:27017/chengjiguanlixitong';
var ObjectId = require('mongodb').ObjectID;

//插入数据
exports.insertone = function(collection,data,callback){
    //连接数据库
    MongoClient.connect(dataurl, function(err, db) {
        if(err){
            console.log("数据库连接失败");
            return;
        }
        console.log("数据成功连接");

        //执行插入数据
        db.collection(collection).insertOne(data,function(err,result){
            callback(err,result);
            db.close();
        });
    });
}


//检索数据
exports.findAll = function(collection , tiaojian ,paixu, callback){
    //连接数据库
    MongoClient.connect(dataurl, function(err, db) {
        //console.log(dataurl);
        if(err){
            console.log("数据库连接失败");
            callback(err,null);
            db.close();
            return;
        }
        console.log("数据成功连接");

        //查询数据库返回了一个游标
        var cursor = db.collection(collection).find(tiaojian).sort(paixu);
        var jieguo = [];
        //游标的遍历
        cursor.each(function(err, doc) {
            if (doc != null) {
                jieguo.push(doc);
            }else{
                callback(null,jieguo);
                db.close();
            }
        });
    });
}

//删除一行数据
exports.deleteThis = function(collection,data,callback){
    //连接数据库
    MongoClient.connect(dataurl, function(err, db) {
        if(err){
            console.log("数据库连接失败");
            return;
        }
        console.log("数据成功连接");


        db.collection(collection).deleteMany(data,function(err,result){
            callback(err,result);

        });
    });
}
