var express=require("express");

var body=require("body-parser");
var fs=require("fs");
var request=require("request");
var cheerio=require("cheerio");
var app=express();

// fileUrl = new URL('file:///tmp/hello');

//connect to mongoose


//configure app
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(body.urlencoded({extended:true}));


//routes

app.get('/',function(req,res){
    
    res.render('mayur');
    
});

app.post("/",function(req,res){
   var url =req.body.url;
  var image=[];
request(url,function(err,resp,body){
   if(err){
       console.log(err);
       } 
    var $=cheerio.load(body);
    
    $('img',req.body.parent).each(function(){
        var src=$(this).attr("src");
        image.push(src);
        
    })
   console.log(image);
   for(var i=0;i<image.length;i++){
       request(image[i]).pipe(fs.createWriteStream(__dirname+"/images/"+i+".jpg"))
   }
   
   res.redirect('/');
});
       
   });









app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server is up..!!!!');
});
