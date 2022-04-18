var express=require("express");
var router=express.Router();

const credentials={
    email:"admin@gmail.com",
    password:"password"
}

router.post("/login",(req,res)=>{
    if(req.body.email==credentials.email&&req.body.password==credentials.password){
        
        req.session.loggedin=true;
        req.session.user=req.body.email;
        
        res.redirect("/route/home");
        //res.send("login success");
    }else if(req.body.email===""){
       
        res.render("index",{message :"Enter useremail "});
    }else if(req.body.password===""){
        
        res.render("index",{message :"Enter password "});
    }else if(req.body.email!=credentials.email){
        res.render("index",{message :"Enter correct email "});
    }else if(req.body.password!=credentials.password){
        res.render("index",{message :"invalid password "});
    }else{
        res.render("index",{message :"Please enter password & email "}); 
    }

});

router.get("/home",(req,res)=>{
    if(req.session.user){
       res.render("home",{user:req.session.user});
    }else{
        res.render("index",{message :"Unauthorize user"});
    }
});

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
      if(err){
            console.log(err);
        }else{
            //res.redirect("/");
           
           res.render("index",{message :"logout successfull...."});
        }
    });
   
});



module.exports=router;