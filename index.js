
//import jsonwebtoken
const jwt=require('jsonwebtoken')

//import cors
const cors=require('cors');
//server creation
//1.import express

const express =require('express')
const dataservice=require('./services/data.service')

//server application create using express

const app=express()

//parse json data
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'

}))

//------------------------------
const jwtMiddleware=(req,res,next)=>{
   try{
    token=req.headers['x-access-token']
    const data=jwt.verify(token,'supersecretkey12345')
    console.log(data)
    next()
   }
   catch{
    res.status(401).json({
        status:false,
        statusCode:401,
        message:"please log in "
   })
   }    
}

//------------------application specific middleware----------------------

const appMiddleware=(req,res,next)=>{
    console.log("Application specific middleware");
    next()

}
app.use(appMiddleware)
//bankapp server
//register API

  
//====================register solving===================================
app.post('/register',(req,res)=>{
dataservice.register(req.body.username,req.body.acno,req.body.password)
.then(result=>{
res.status(result.statuscode).json(result)
})
})
//--------------login API-----------
//register API
 //====================register solving===================================
app.post('/login',(req,res)=>{
dataservice.login(req.body.acno,req.body.pswd).then(result=>{
res.status(result.statuscode).json(result)
})
})
    
//------------------------deposit--------------------------------------
app.post('/deposit',jwtMiddleware,(req,res)=>{
  dataservice.deposit(req.body.acno,req.body.pswd,req.body.amt).then(result=>{
    res.status(result.statuscode).json(result)
    })
})
//-------------------------------------------------------------------------
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    dataservice.withdraw(req.body.acno,req.body.pswd,req.body.amt).then(result=>{
    res.status(result.statuscode).json(result)
    })  
})
//------------------------------------------------------------------------------
app.post('/getTransaction', jwtMiddleware,(req,res)=>{
    dataservice.getTransaction(req.body.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })
  
    })  


//user request resolving
//get ,put,post,patch,delete-http methods
//get request-to fetch data
app.get('/',(req,res)=>{
    res.send("GET Request")
})
//post-to create data
app.post('/',(req,res)=>{
    res.send("POST request")})
//put-to modify entire data

app.put('/',(req,res)=>{
    res.send("Put request")
})
//patch-
app.patch('/',(req,res)=>{
    res.send("Patch request")
})

app.delete('/',(req,res)=>{
    res.send("delete request")
})

//set up the port number to the server app
app.listen(3000,()=>{
    console.log('server started at 3000')

})