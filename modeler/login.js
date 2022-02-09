//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";









module.exports.login = (req,res) => {
   
       
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
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