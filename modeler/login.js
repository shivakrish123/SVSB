//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";
var CryptoJS = require("crypto-js");


var crypt = {
  // (B1) THE SECRET KEY
  secret : "CIPHERKEY",
 
  // (B2) ENCRYPT
  encrypt : (clear) => {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },
 
  // (B3) DECRYPT
  decrypt : (cipher) => {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};





module.exports.login = (req,res) => {
   
       
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            
            // db.close();
            var dbo = db.db("SVSB");
            query={email:req.body.email}
            dbo.collection("Customers").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(crypt.decrypt(result[0].password));
                if(result.length>0&&req.body.password==crypt.decrypt(result[0].password)){
                  
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