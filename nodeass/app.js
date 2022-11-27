const express=require("express");
const app=express();
const port=3004
const mysql=require("./connection").con;

app.set("view engine","hbs");
app.set("views","./view")

app.use("/public",express.static("./public"));

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/seeresult",(req,res)=>{
    res.render("seeresult");
});

app.get("/update/:rollno",(req,res)=>{
    let rollno=req.params.rollno;
    let qr2= `select * from results where rollno=${rollno}`;
    mysql.query(qr2,(err,result2)=>{
        console.log("error 4444aaaaaaaaaaa");
        if(err){
           console.log(err,'errs');
        }
       else{
           res.render("update",{result2:result2});
    }   
   });
});

app.get("/update",(req,res)=>{
    res.render("update");
});

app.get("/doupdate",(req,res)=>{

    let rollno=req.query.rollno ;
    let name=req.query.name ;
    let dob=req.query.dob ;
    let score=req.query.score ;
    console.log(rollno+" "+name+" "+dob+" "+score);
    let qr=`update results set name='${name}',score=${score},dob='${dob}' where rollno=${rollno};`;
    let qr2= "select * from results";

    mysql.query(qr,(err,result)=>{
        if(err){
           console.log(err,'errs');
        }
   });
    mysql.query(qr2,(err,result2)=>{
        if(err){
           console.log(err,'errs');
        }
        if(result2.length>0){
           res.render("addresult",{msg2:true,msg4:true,result2:result2});
        }
        else{
            res.render("addresult",{msg3:true});
        }
   });

});

app.get("/record",(req,res)=>{
    res.render("record");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/addresult",(req,res)=>{
    res.render("addresult");
});

app.get("/resultpage",(req,res)=>{
    res.render("resultpage");
});


app.get('/tlogin',(req,res)=>{   
    let username=req.query.username;
    let userpass=req.query.password;
    console.log(userpass+"---->>>"+username );
    let qr= ` select userpass from tlogin where username = '${username}'`;
     let qr2= "select * from results";

    mysql.query(qr,(err,result)=>{
    
        if(err){
            console.log(err,'errs');
        }

        if(result.length>0){
            if(result[0].userpass==req.query.password){

                mysql.query(qr2,(err,result2)=>{
    
                    if(err){
                        console.log(err,'errs');
                    }
                    if(result2.length>0){
                        console.log("---->>>"+result2+"<<<----");
                        res.render("addresult",{msg4:true,msg2:true,user:username,result2:result2});
                    }
                    else{
                        res.render("addresult",{msg3:true,msg2:true});
                    }
                });
            }
            else{
                res.render("login",{msg1:true});
            }
        }
        else{
         res.render("login",{msg1:true});
        }
    })
})


app.get('/adddata',(req,res)=>{   
    let rollno=req.query.rollno ;
    let name=req.query.name ;
    let dob=req.query.dob ;
    let score=req.query.score ;
    
    let qr=`insert into results values(${rollno},'${name}',${score},'${dob}');`;
    let qr2= "select * from results";
    let qr3= `select * from results where rollno='${rollno}'`;

    mysql.query(qr3,(err,result3)=>{
        if(err){
            console.log(err,'errs');
        }
        else{
            if(result3.length==0){
             
                mysql.query(qr,(err,result)=>{
                   
                    if(err){
                        console.log(err,'errs');
                    } 
                })
            }
            else{
               res.render("record",{flag:true});
            }
                mysql.query(qr2,(err,result2)=>{
                  
                    if(err){
                       console.log(err,'errs');
                    }
                    if(result2.length>0){
                       res.render("addresult",{msg2:true,msg4:true,result2:result2});
                    }
                    else{
                        res.render("addresult",{msg3:true});
                    }
               });
        }  
    })
})

app.get('/delete/:rollno',(req,res)=>{   
    let rollno=req.params.rollno;
    let qr=`delete from results where rollno=${rollno}`;
    let qr2= "select * from results";
    mysql.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        else{
            mysql.query(qr2,(err,result2)=>{               
                if(err){
                    console.log(err,'errs');
                }
                if(result2.length>0){               
                    res.render("addresult",{msg2:true,result2:result2,msg4:true});
                }
                else{
                    res.render("addresult");
                }
            });
        }
    })
})



app.get('/getresult',(req,res)=>{   
    let rollno=req.query.rollno;
    let dob=req.query.dob;
    let qr= ` select  * from results where rollno = ${rollno}`;


    mysql.query(qr,(err,result)=>{
    
        if(err){
            console.log(err,'errs');
        }

        if(result.length>0){
            if(result[0].dob==dob){
                res.render("resultpage",{us:result});   
            }
            else{
                res.render("seeresult",{msg1:true});
            }
        }
        else{
         res.render("seeresult",{msg1:true});
        }
    })
})


app.listen(port ,(err)=>{
    if(err)
        throw err
    else
       console.log("server is running ")
});