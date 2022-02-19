const express = require('express');
const path = require('path'); // required for absolute path while rendering html pages
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(express.static("public"));
//app.use(express.static("public/scripts"));
//app.use('./modeler');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) ;
app.use(session({secret: 'ssshhhhh'})); // secret is necessary for managing sessions

let forgotPassword = require('./modeler/forgotPassword');
let addProperty = require('./modeler/addProperty');
let filterProperties = require('./modeler/filterProperties');
let filterPropertiesAdmin = require('./modeler/filterPropertiesAdmin');
let login = require('./modeler/login');
let register = require('./modeler/register');
let updateProperty = require('./modeler/updateProperty');
let setTileData = require('./modeler/setTileData');
let getProperties=require('./modeler/getProperties')
let getPropertiesForEdit=require('./modeler/getPropertiesForEdit')
// do url routing
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.post('/addProperty',(req,res)=>{
    addProperty.addProperty(req,res);
});

app.post('/filterProperties',(req,res)=>{
    filterProperties.filterProperties(req,res);
});
app.post('/filterPropertiesAdmin',(req,res)=>{
    filterPropertiesAdmin.filterPropertiesAdmin(req,res);
});

app.post('/login',(req,res)=>{
    //const s = req.session;
    login.login(req,res);
})
app.post('/register',(req,res)=>{
    //const s = req.session;
    register.register(req,res);
})
app.post('/updateProperty',(req,res)=>{
    //const s = req.session;
    updateProperty.updateProperty(req,res);
})
app.post('/setTileData',(req,res)=>{
    //const s = req.session;
    setTileData.setTileData(req,res);
})
app.post('/getPropertiesForEdit',(req,res)=>{
    //const s = req.session;
    getPropertiesForEdit.getPropertiesForEdit(req,res);
})
app.post('/forgotPassword',(req,res)=>{
    //const s = req.session;
    forgotPassword.forgotPassword(req,res);
})
app.get('/getProperties',(req,res)=>{
    //const s = req.session;
    getProperties.getProperties(req,res);
})

// listen @ 3000
app.listen(process.env.PORT || 3000,()=>{
    console.log('Listening at port 3000');
});


/*
inside any function, create a variable say 'sess' and assign it as req.session;
this sess is an object like our $_SESSION variable in php
we can set the name like:
    sess.name = 'Kaushik'; // this is same as $_SESSION['name'] = 'Kaushik';
*/
