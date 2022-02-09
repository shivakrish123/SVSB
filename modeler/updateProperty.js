const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";





// const { request } = require("express")







module.exports.updateProperty = async (req,res) => {

console.log('hi')
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        //console.log("Database created!");
        
        // db.close();
        var dbo = db.db("SVSB");
        var myquery = {'propertyID':req.body.propertyID};
        var values=req.body
        var newvalues={$set:{}}
        newvalues.$set=values
        dbo.collection("Properties").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
    //  console.log(newvalues)
     res.send('success')
})
}
