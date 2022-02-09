
//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";

function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
} 


module.exports.filterProperties = async (req,res) => {
   




  var propertyType=JSON.parse(req.body.propertyType)
  var investmentType=JSON.parse(req.body.investmentType)
  var investmentStrategy=JSON.parse(req.body.investmentStrategy)
  var properties=req.session.properties;
  var text="";
  var arr=[];
  var tileData=req.session.tileData;
  properties.forEach(function(result){
  if(propertyType.includes(result.propertyType)){
    if(investmentType.includes(result.investmentType)){
      if(investmentStrategy.includes(result.investmentStrategy)){
        arr.push(result);
      }
    }
  }
  })

if(req.body.sortBy!="none"){
  arr.sort(GetSortOrder(req.body.sortBy));
}

  arr.forEach(function(result){
    tileDataList=""
    tileData.forEach(function(x){
      tileDataList+="<li>"+x.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")+": <span style='color:black;'>"+result[x]+"</span></li>"
    })
    text=text+'<div class="card small col-lg-4 col-md-4 col-sm-6" style="padding: 0;"> <div class="thumbnail img-thumb-bg"> <img class="img-responsive" src="'+result.image1+'" alt=""> <div class="overlay"></div> <div class="caption"> <div class="tag"><a href="#">'+result.propertyType+'</a></div> <div class="title"><a href="#">'+result.propertyName+'</a></div> <div class="clearfix"> <span class="meta-data">'+result.city+', '+result.state+'</span>  </div> <div class="content"> <p>'+result.shortDescription+'</p> </div> </div> </div> <div class="card-attributes"> <span class="price">$'+result.offeringPrice+'</span> <ul id="tileDataAttributes">' +tileDataList+'</ul> <br> <a href="javascript:void(0)" onclick='+"'"+'setProperty('+""+JSON.stringify(result)+""+')'+"'"+' class="btn btn-detail">Details</a> </div> </div>'
  })

  if(!text){
    text="<center><h3>No Results Found</h3></center>"
  }
  res.send(text);




  //  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
  //   if (err) throw err;
    
  //   // db.close();
  // var dbo = db.db("SVSB");


  //   query={"propertyType":{$in :propertyType}}
  //   console.log(propertyType)
  //   var text=""
  //   dbo.collection("Properties").find(query).toArray(function(err, resultt) {
  //       if (err) throw err;
  //       if(resultt.length>0){
  //           resultt.forEach(function(result){
  //               text=text+'<div class="card small col-lg-4 col-md-4 col-sm-6" style="padding: 0;"> <div class="thumbnail img-thumb-bg"> <img class="img-responsive" src="img/service2.jpg" alt=""> <div class="overlay"></div> <div class="caption"> <div class="tag"><a href="#">'+result.propertyType+'</a></div> <div class="title"><a href="#">'+result.propertyName+'</a></div> <div class="clearfix"> <span class="meta-data">'+result.city+', '+result.state+'</span>  </div> <div class="content"> <p>'+result.shortDescription+'</p> </div> </div> </div> <div class="card-attributes"> <span class="price">$'+result.offeringPrice+'</span> <ul> <li>attribute1 : value1</li> <li>attribute2 : value2</li> </ul> <br> <a href="details.html" class="btn btn-detail">Details</a> </div> </div>'
  //             })
  //             res.send(text)
  //                   }
  //       else{
  //         res.send('failed');
  //       }
  //     });
  // });
   
}
