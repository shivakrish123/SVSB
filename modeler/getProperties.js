var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";




module.exports.getProperties = async (req,res) => {
   

    var query={}
    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        

    var dbo = db.db("SVSB");
    var text="";
    dbo.collection("Properties").find(query).toArray(async function(err, resultt) {
        if (err) throw err;
        if(resultt.length>0){
          
          resultt.forEach(function(result){
            text=text+'<div class="card small col-lg-4 col-md-4 col-sm-6" style="padding: 0;"> <div class="thumbnail img-thumb-bg"> <img class="img-responsive" src="img/service2.jpg" alt=""> <div class="overlay"></div> <div class="caption"> <div class="tag"><a href="#">'+result.propertyType+'</a></div> <div class="title"><a href="#">'+result.propertyName+'</a></div> <div class="clearfix"> <span class="meta-data">'+result.city+', '+result.state+'</span>  </div> <div class="content"> <p>'+result.shortDescription+'</p> </div> </div> </div> <div class="card-attributes"> <span class="price">$'+result.offeringPrice+'</span> <ul> <li>attribute1 : value1</li> <li>attribute2 : value2</li> </ul> <br> <a href="details.html" class="btn btn-detail">Details</a> </div> </div>'
          })
          res.send(text)
        }
      });
    });

   
  

}