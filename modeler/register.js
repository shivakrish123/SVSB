//var con = require('./db_connection');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";









module.exports.register = async (req,res) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("SVSB");
            var flag=0;
            var query={firstName:req.body.firstName,lastName:req.body.lastName,email:req.body.email}
           
            dbo.collection("Customers").find(query).toArray(function(err, result) {
             
              if(result.length>0){
              flag=1;
              res.send('Account already exists');
               }
               else{
                dbo.collection("Customers").insertOne(req.body, function(err, res) {
                  if (err) throw err;
                 
                 flag=0;
                  
                });
                send="Account Created!"
                res.send(send)
               }
            })
           
             
          
          
           
          });

          

}