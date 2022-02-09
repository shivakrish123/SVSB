const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";





// const { request } = require("express")







module.exports.setTileData = async (req,res) => {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        //console.log("Database created!");
        
        // db.close();
        var dbo = db.db("SVSB");
        var myquery = {'docId':'tileData'};
        var tileDataArray=JSON.parse(JSON.stringify(req.body['tileDataArray[]']))
        var newvalues={$set:{tileDataArray}}
        dbo.collection("TileData").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
     res.send('success')
})
}
