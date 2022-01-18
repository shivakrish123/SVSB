var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";





// const { request } = require("express")







module.exports.updateProperty = async (req,res) => {

console.log('hi')
  MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        //console.log("Database created!");
        
        // db.close();
        var dbo = db.db("SVSB");
        var myquery = {'propertyID':req.body.propertyID};
        var values=req.body
        var newvalues={$set:{values}}
        dbo.collection("Properties").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
     //console.log(req.body)
     res.send('success')
}
