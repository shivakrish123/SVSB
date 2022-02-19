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






module.exports.forgotPassword = async (req,res) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("SVSB");
            req.body.password=crypt.encrypt(req.body.password)
            var flag=0;
            var password=req.body.password
            var query={email:req.body.email,}
            var newvalues={$set:{password:password}}
            dbo.collection("Customers").updateOne(query, newvalues, function(err, res) {
              if (err) {throw err;};
              console.log("1 document updated");
            });
            res.send('success')

             
          
          
           
          });

          

}