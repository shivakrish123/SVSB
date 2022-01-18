//var con = require('./db_connection');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";









module.exports.login = (req,res) => {
   
       
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            
            // db.close();
            var dbo = db.db("SVSB");
            query={email:req.body.email, password:req.body.password}
            dbo.collection("Customers").find(query).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result);
                if(result.length>0){
                  req.session.user=result[0];
                  //console.log(req.session.user)
                  res.send('success');
                }
                else{
                  res.send('failed');
                }
              });
          });



}