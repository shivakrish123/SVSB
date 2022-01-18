var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";





// const { request } = require("express")







module.exports.addProperty = async (req,res) => {

console.log('hi')
  MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        //console.log("Database created!");
        
        // db.close();
        var dbo = db.db("SVSB");
        var myobj = req.body
        dbo.collection("Properties").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        });
      });
     //console.log(req.body)
     res.send('success')
}
