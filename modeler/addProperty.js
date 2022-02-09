const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";





// const { request } = require("express")







module.exports.addProperty = async (req,res) => {

console.log('hi')
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
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
