const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";




module.exports.getProperties = async (req,res) => {
   

    var query={}
    if (req.session.properties&&req.session.tileData){
      var resultt=req.session.properties;
      var text="";
      var tileData;
        var tileData=req.session.tileData
  var tileDataList="";


      resultt.forEach(function(result){
        tileDataList=""
        tileData.forEach(function(x){
          tileDataList+="<li>"+x.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")+": <span style='color:black;'>"+result[x]+"</span></li>"
        })
        text=text+'<div class="card small col-lg-4 col-md-4 col-sm-6" style="padding: 0;"> <div class="thumbnail img-thumb-bg"> <img class="img-responsive" src="'+result.image1+'" alt=""> <div class="overlay"></div> <div class="caption"> <div class="tag"><a href="#">'+result.propertyType+'</a></div> <div class="title"><a href="#">'+result.propertyName+'</a></div> <div class="clearfix"> <span class="meta-data">'+result.city+', '+result.state+'</span>  </div> <div class="content"> <p>'+result.shortDescription+'</p> </div> </div> </div> <div class="card-attributes"> <span class="price">$'+result.offeringPrice+'</span> <ul id="tileDataAttributes">' +tileDataList+'</ul> <br> <a href="javascript:void(0)" onclick='+"'"+'setProperty('+""+JSON.stringify(result)+""+')'+"'"+' class="btn btn-detail">Details</a> </div> </div>'
      })
      res.send(text)
    }
    else
{
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function(err, db) {
    if (err) throw err;
    

var dbo = db.db("SVSB");
var text="";
var tileData;
dbo.collection("TileData").find({docId:'tileData'}).toArray(async function(err, resultt) {
  if (err) throw err;
  if(resultt.length>0){
    tileData=resultt[0].tileDataArray;
    req.session.tileData=tileData
  }
});
var tileDataList="";

dbo.collection("Properties").find(query).toArray(async function(err, resultt) {
    if (err) throw err;
    if(resultt.length>0){
      req.session.properties=resultt;
      resultt.forEach(function(result){
        tileDataList="";
        var temp;
        tileData.forEach(function(x){
          if(!result[x]){
            temp="No Value"
          }
          else{
            temp=result[x];
          }
          tileDataList+="<li>"+x.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")+": <span style='color:black;'>"+temp+"</span></li>"
        })
        text=text+'<div class="card small col-lg-4 col-md-4 col-sm-6" style="padding: 0;"> <div class="thumbnail img-thumb-bg"> <img class="img-responsive" src="'+result.image1+'" alt=""> <div class="overlay"></div> <div class="caption"> <div class="tag"><a href="#">'+result.propertyType+'</a></div> <div class="title"><a href="#">'+result.propertyName+'</a></div> <div class="clearfix"> <span class="meta-data">'+result.city+', '+result.state+'</span>  </div> <div class="content"> <p>'+result.shortDescription+'</p> </div> </div> </div> <div class="card-attributes"> <span class="price">$'+result.offeringPrice+'</span> <ul id="tileDataAttributes" style="text-transform:capitalize!important">' +tileDataList+'</ul> <br> <a href="javascript:void(0)" onclick='+"'"+'setProperty('+""+JSON.stringify(result)+""+')'+"'"+' class="btn btn-detail">Details</a> </div> </div>'
      })
      res.send(text)
    }
  });
});
}

   
  

}