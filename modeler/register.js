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






module.exports.register = async (req,res) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("SVSB");
            req.body.password=crypt.encrypt(req.body.password)
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
                var send="Account Created!"
                res.send(send)
               }
            })
           
             
          
          
           
          });

          

}