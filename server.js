var express=require("express");
var fileUploader=require("express-fileupload");
var mysql2=require("mysql2");


var cloudinary=require("cloudinary").v2

let app=express();

const path= require('path');
app.use(express.static(__dirname));

// app.use(express.static("public"));
app.listen(2006,function(){
    console.log("Server started");
})

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

let dbConfig="mysql://avnadmin:AVNS_vU_Gkk42BfrbN3ayh6Q@mysql-1a4a20c9-officialarjunsingla27246-3cf2.i.aivencloud.com:11285/defaultdb";

let mySqlServer=mysql2.createConnection(dbConfig);

mySqlServer.connect(function(err){
    if(err!=null)
    {
        console.log(err.message);
    }
    else
        console.log("Connected to DB")
    
})


app.get("/",function(req,resp){
    
  let dirName=__dirname;//Global Variable for path of current directory
 
  let fullpath=dirName+"/index.html";
  resp.sendFile(fullpath);
})



// app.get("/signup",function(req,resp){
//   resp.sendFile(__dirname+"/signup.html");
// })

// app.get("/login",function(req,resp){
//   resp.sendFile(__dirname+"/login.html");
// })

// app.post("/do-insert",function(req,resp){
 
// //  console.log(result);
//  console.log(req.body);
//   let query="INSERT INTO users (emailid,pwd,utype,dos,status) VALUES(?,?,?,CURDATE(),?)";
//   mySqlServer.query(query, [req.body.txtEmail,req.body.txtpwd,req.body.usertype,'1'], function(err,result){
//     if(err){
//       resp.send(err.message);
//     }
//     else{
//       console.log("Query result:",result);
//       resp.send("Signed up successfully");
//     }
//   } )

// })


app.post("/do-insert",function(req,resp){
  console.log(req.body);

  mySqlServer.query("insert into users  (emailid,pwd,utype,dos,status) values (?,?,?,current_date(),1)",[req.body.txtEmail,req.body.txtpwd,req.body.usertype],function(err){
      if(err){
          console.log(err);
          resp.send(err);
      }
      else{
          resp.send("Record Saved Successfully");
      }
  })
})

app.post("/login-details",function(req,resp){
  // console.log(result);
  console.log(req.body);
  let query="select * from users where emailid=? and pwd=? and status=1";
  mySqlServer.query(query, [req.body.txtEmail1,req.body.txtpwd1], function(err,result){
if(err){
console.log(err);
resp.send(err);
}
else{
console.log(result);
resp.send(result);
}
  } )

})



app.use(express.urlencoded({extended:true}));
app.use(fileUploader());

cloudinary.config({ 
    cloud_name: 'dwpvsr6sz', 
    api_key: '957791518922238', 
    api_secret: 'jri5XSHfOLtq2oEuTNkutNix810' // Click 'View API Keys' above to copy your API secret
});


app.get("/vol-kyc",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/vol-kyc.html";
  resp.sendFile(fullpath);
})


app.get("/vol-dash",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/vol-dash.html";
  resp.sendFile(fullpath);
})


app.get("/admin-dash",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/admin-dash.html";
  resp.sendFile(fullpath);
})



app.get("/client-profile",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/client-profile.html";
  resp.sendFile(fullpath);
})

app.get("/post-job",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/post-job.html";
  resp.sendFile(fullpath);
})


app.get("/angular-http",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/angular-http.html";
  resp.sendFile(fullpath);
})




app.get("/user-controller",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/user-controller.html";
  resp.sendFile(fullpath);
})

app.get("/find-work",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/find-work.html";
  resp.sendFile(fullpath);
})

app.get("/volu-manager",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/volu-manager.html";
  resp.sendFile(fullpath);
})

app.get("/client-manager",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/client-manager.html";
  resp.sendFile(fullpath);
})

app.get("/job-manager",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/job-manager.html";
  resp.sendFile(fullpath);
})


app.get("/client-dash",function(req,resp){
  let dirName=__dirname;
  let fullpath=dirName+"/client-dash.html";
  resp.sendFile(fullpath);
})

app.post("/do-insertinfo-volkyc",async function(req,resp)
{
  console.log(req.body);
    
  // let picpath=req.body.txtpicpath;
  // let idpath=req.body.txtidpath;

  let fileName;
    let fileName1;
    if (req.files != null) {
        fileName = req.files.ppic.name;
        let locationToSave = __dirname  + fileName;//full ile path
        req.files.ppic.mv(locationToSave);//saving file in uploads folder

        //saving ur file/pic on cloudinary server
        try {
            await cloudinary.uploader.upload(locationToSave).then(function (picUrlResult) {
                fileName = picUrlResult.url;   //will give u the url of ur pic on cloudinary server
                console.log(fileName);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    else
        fileName = "nopic.jpg";

    if (req.files != null) {
        fileName1 = req.files.idpic.name;
        let locationToSave = __dirname  + fileName1;//full ile path
        req.files.idpic.mv(locationToSave);//saving file in uploads folder

        //saving ur file/pic on cloudinary server
        try {
            await cloudinary.uploader.upload(locationToSave).then(function (picUrlResult) {
                fileName1 = picUrlResult.url;   //will give u the url of ur pic on cloudinary server
                console.log(fileName1);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    else
        fileName1 = "nopic.jpg";

        let email=req.body.txtEmail;
  let vName=req.body.txtname;
  let contact=req.body.txtcontact;
  let address=req.body.txtaddress;
  let city=req.body.txtcity;
  let gender=req.body.txtgender;
  let dob=req.body.txtdob;
  let quali=req.body.txtquali;
  let occu=req.body.txtoccu;
  let info=req.body.txtinfo;

  var datary=[email,vName,contact,address,city,gender,dob,quali,occu,info,fileName,fileName1];


    mySqlServer.query("INSERT INTO volkyc (emailid,vName,contact,address,city,gender,dob,quali,occu,info,picpath,idpath) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",datary,function(err,result)
    {
            if(err)
            {
              // resp.send(err.message);
              console.log(err);
              resp.send(err.message);

                // resp.send("Record Saved Successsfulllyyy.. Badhaiiii");
            
                // resp.send("Record Saved Successsfulllyyy.. Badhaiiii");
            }
            else
            resp.send("Record Saved Successsfulllyyy.. Badhaiiii");

    })
}  )


app.post("/do-update-kyc",async function(req,resp)
{
 

   
  let email=req.body.txtEmail;
  let vName=req.body.txtname;
  let contact=req.body.txtcontact;
  let address=req.body.txtaddress;
  let city=req.body.txtcity;
  let gender=req.body.txtgender;
  let dob=req.body.txtdob;
  let quali=req.body.txtquali;
  let occu=req.body.txtoccu;
  let info=req.body.txtinfo;
    let fileName;
    let fileName1;
    if(req.files!=null)
    {
        fileName1=req.files.idpic.name;
        let locationToSave=__dirname+fileName;//full ile path
        req.files.idpic.mv(locationToSave);//saving file in uploads folder

         //saving ur file/pic on cloudinary server
         try{
         await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
            fileName=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
            console.log(fileName);
            });
        }
        catch(err)
        {
            resp.send(err.message);
        }

    }
    else
    fileName="nopic.jpg";

    if(req.files!=null)
      {
          fileName=req.files.ppic.name;
          let locationToSave=__dirname+fileName;//full ile path
          req.files.ppic.mv(locationToSave);//saving file in uploads folder
  
           //saving ur file/pic on cloudinary server
           try{
           await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
              fileName=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
              console.log(fileName);
              });
          }
          catch(err)
          {
              resp.send(err.message);
          }
  
      }
      else
      fileName="nopic.jpg";

    mySqlServer.query("update volkyc set vName=?,contact=?,address=?,city=?,gender=?,dob=?,quali=?,occu=?,info=?,picpath=?,idpath=? where emailid=?",[vName,contact,address,city,gender,dob,quali,occu,info,fileName,fileName1,email],function(err,result)
    {
            if(err==null)
            {
                if(result.affectedRows==1)
                    resp.send("Record Update Successsfulllyyy.. Badhaiiii");
                else
                    resp.send("Invalid Email ID");
            }
            else
            resp.send(err.message);
    })
})

app.get("/do-fetch-one",function(req,resp)
{
    mySqlServer.query("select * from volkyc where emailid=?",[req.query.Email],function(err,resultAry)
    {
        // console.log(resultAry);
        
            resp.send(resultAry);
    })
})


app.get("/do-chek-email",function(req,resp)
{
    mySqlServer.query("select * from volkyc where emailid=?",[req.query.Email],function(err,resultAry)
    {
        // console.log(result);
        if(resultAry.length==0)
                resp.send("Available")
        else
            resp.send("Already Taken");
    })
})

app.post("/do-clientprofile-cprofile",function(req,resp){

  // console.log(req.body);

let cmail=req.body.txtcmail;
let name=req.body.txtname;
let business=req.body.txtfirm;
let address=req.body.txtaddress;
let bprofile=req.body.txtbprof;
let city=req.body.txtcity;
let contact=req.body.txtcontact;
let idproof=req.body.txtproof;
let idpnumber=req.body.txtnumber;
let info=req.body.txtinfo




  
  mySqlServer.query("INSERT INTO cprofile (emailid,cName,business,bprofile,address,city,contact,idproof,idpnumber,info) VALUES(?,?,?,?,?,?,?,?,?,?)",[cmail,name,business,bprofile,address,city,contact,idproof,idpnumber,info],function(err,result)
  {
          if(err)
          {
            // resp.send(err.message);
            console.log(err);
            resp.send(err.message);

              // resp.send("Record Saved Successsfulllyyy.. Badhaiiii");
          
              // resp.send("Record Saved Successsfulllyyy.. Badhaiiii");
          }
          else
          resp.send("Record Saved Successsfulllyyy.. Badhaiiii");

})
})



app.post("/do-update-cprofile",function(req,resp){

  // console.log(req.body);

let cmail=req.body.txtcmail;
let name=req.body.txtname;
let business=req.body.txtfirm;
let address=req.body.txtaddress;
let bprofile=req.body.txtbprof;
let city=req.body.txtcity;
let contact=req.body.txtcontact;
let idproof=req.body.txtproof;
let idpnumber=req.body.txtnumber;
let info=req.body.txtinfo


mySqlServer.query("update cprofile set cName=?,business=?,bprofile=?,address=?,city=?,contact=?,idproof=?,idpnumber=?,info=? where emailid=?",[name,business,bprofile,address,city,contact,idproof,idpnumber,info,cmail],function(err,result)
{
        if(err==null)
        {
            if(result.affectedRows==1)
                resp.send("Record Update Successsfulllyyy.. Badhaiiii");
            else
                resp.send("Invalid Email ID");
        }
        else
        resp.send(err.message);
})

})


app.get("/do-fetch-cmail",function(req,resp)
{
    mySqlServer.query("select * from cprofile where emailid=?",[req.query.cmail],function(err,resultAry)
    {
        // console.log(resultAry);
        
            resp.send(resultAry);
    })
})




app.post("/do-publishjobs-JOBS",function(req,resp){

  
let cmail=req.body.txtcmail;
let jobtitle=req.body.txttitle;
let jobtype=req.body.txttype;
let firmaddress=req.body.txtfirm;
let city=req.body.txtcity;
let education=req.body.txtedu;
let contactperson=req.body.txtcontact;

mySqlServer.query("Insert into JOBS(jobid,cid,jobtitle,jobtype,address,city,edu,contact) values(?,?,?,?,?,?,?,?)",[null,cmail,jobtitle,jobtype,firmaddress,city,education,contactperson],function(err,result){

if(err)
{
  console.log(err);
  resp.send(err.message);
}
else
resp.send("Job publish successfully.......");


})
})


//----------------Angular-----AJax----------------
app.get("/fetch-data",function(req,resp)
{
    mySqlServer.query("select * from curdTable",function(err,result)
    {
        console.log(result);
        resp.send(result);
    })
})

app.get("/do-delete-one-record",function(req,resp)
{
    let userMail=req.query.Anyemail;
                                                  //col name Same as  table col name
    mySqlServer.query("delete from curdTable where email=?",[userMail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("Record Deleted Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})

// app.get("/fetch-all-data",function(req,resp)
// {
//     connection.query("select * from Users",function(err,result)
//     {
//       alert(result);
//         console.log(result);
//         resp.send(result);
//     })
// })

app.get("/fetch-all-data",function(req,resp)
{
    mySqlServer.query("select * from users",function(err,result)
    {
      
        console.log(result);
        resp.send(result);
     })
})


app.get("/do-block",function(req,resp)
{
  let userMail=req.query.anyemailid;
    mySqlServer.query("update users set status=0 where emailid=?",[userMail],function(err,result)
    {  
      if(!err)
      {
          
              resp.send(200);
      }
      else{
        console.log(err)
      resp.send(err);
      }
    })
})

app.get("/fetch-all-client-records",function(req,resp)
{
    mySqlServer.query("select * from cprofile",function(err,result)
    {
      
        console.log(result);
        resp.send(result);
     })
})


app.get("/do-Resume",function(req,resp)
{
  let userMail=req.query.anyemailid;
    mySqlServer.query("update users set status=1 where emailid=?",[userMail],function(err,result)
    {  
      if(!err)
        {
            
                resp.send(200);
        }
        else{
          console.log(err)
        resp.send(err);
        }
    })
})
//---------user controller----------api----------
app.get("/fetch-all-records",function(req,resp)
{
    mySqlServer.query("select * from JOBS",function(err,result)
    {
      
        console.log(result);
        resp.send(result);
     })
})


//-------------------------------------------------

app.get("/fetch-all-vol-records",function(req,resp)
{
    mySqlServer.query("select * from volkyc",function(err,result)
    {
      
        console.log(result);
        resp.send(result);
     })
})

app.get("/fetch-jobs-all",function(req,res){
  mySqlServer.query("select * from JOBS",function(err,result){
      console.log(result);
      res.send(result);
  })
})

//when user not select city from the drop down
app.get("/fetch-jobs-job", function(req,res){
  mySqlServer.query("select * from JOBS where jobtitle=?",req.query.jobtype,function(err,result){
      console.log(result);
      res.send(result);
  })

})

//when user not select jobtype from the drop down
app.get("/fetch-jobs-city", function(req,res){
  mySqlServer.query("select * from JOBS where city=?",req.query.city,function(err,result){
      console.log(result);
      res.send(result);
  })

})

//when user select jobtype and city both from the drop down
app.get("/fetch-jobs-both", function(req,res){
mySqlServer.query("select * from JOBS where city=? and jobtitle=?",[req.query.city,req.query.job],function(err,result){
      console.log(result);
      res.send(result);
  })

})


app.get("/all-cities", function(req,res){
  mySqlServer.query("select distinct city from JOBS", function(err,result){
      console.log(result);
      res.send(result);
  })
})

//fill all the jobs
app.get("/all-jobs",function(req,resp)
{
  mySqlServer.query("select distinct jobtitle from JOBS",function(err,result)
  {
      console.log(result);
      resp.send(result);
  })
})
//------------------------------------------------------------------------------------------------------------
// app.get("/fetch-Jobs-data-withemail",function(req,resp)
// {
//     mySqlServer.query("select * from JOBS where cid=?",[req.query.emailsearch],function(err,result)
//     {
      
//         console.log(result);
//         resp.send(result);
//      })
// })

app.get("/fetch-Jobs-data-withemail",function(req,resp)
{
    console.log(req.query);
    mySqlServer.query("select * from JOBS where cid=?",[req.query.emailsearch],function(err,result)
    {
      
        console.log(result);
        console.log(err);
        resp.send(result);
     })
})


app.get("/fetch-Jobs-data-delete",function(req,resp)
{
    let userMail=req.query.Drecord;
                                                  //col name Same as  table col name
    mySqlServer.query("delete from JOBS where cid=?",[userMail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("Record Deleted Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})
app.get("/fetch-Jobs-data",function(req,resp)
{
  mySqlServer.query("select * from JOBS",function(err,result)
  {
      console.log(result);
      resp.send(result);
  })
})

// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',           
//   password: '1189816d',   
//   database: 'dbworkk',    
//   port: 3306             
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//     return;
//   }
//   console.log('Connected to the MySQL database.');
// });

