//db connection
//import  mongoose
const mongoose=require('mongoose')
//connection string
mongoose.connect('mongodb://localhost:27017/BankApp',{
    useNewUrlParser:true
})
//model defition or collection declare
//model name should be singular 
const User=mongoose.model('User',{
acno:Number,
username:String,
password:String,
balance:Number,
transaction:[]
})
module.exports={
    User
}