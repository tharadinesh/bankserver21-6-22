
//import jsonwebtoken
const jwt=require('jsonwebtoken')
//import db.js

const db=require('./db')

//database

// db={
//     1000:{"acno":1000,"username":"Ram","password":1000,"balance":5000,transaction:[]},
//     1001:{"acno":1001,"username":"Raju","password":1001,"balance":10000,transaction:[]},
//     1002:{"acno":1002,"username":"Tom","password":1002,"balance":25000,transaction:[]}
//   }
  //register
  const register=(username,acno,password)=> { 
   return  db.User.findOne({
    acno
  }).then(user=>{
    console.log(user);
    if(user){
      return { 
                  status:false,
                  message:"Already REgistered .Please Login!......",
                  statuscode:401
                }
    }
    else
    {
      //insert db
      const newUser=new db.User({
      
        acno,
        username,
      password,
       balance:0,
       transaction:[]

      
    })
   newUser.save()
        return { 
          status:true,
          message:"registed successfully......",
          statuscode:200
        }
    }
   })
  }
  const login=(acno,pswd)=>{
  
  return db.User.findOne({
    acno,
    password:pswd 

  }).then(user=>{
    if(user)
    {
      console.log(user);
      currentUser=user.username
      currentAcno=acno
      //token generation
      token= jwt.sign({
        //store as key value
        currentAcno:acno
      },'supersecretkey12345')
      return {
        status:true,
        message:"Login successfully......",
        statuscode:200,
        currentUser,
        currentAcno,
        token
      }
    }
    else
    {
      return {
        status:false,
        message:"Incorrect password......",
        statuscode:401
       }
       
    }
  })
    
}    
       
const deposit=(acno,pswd,amt)=>{
  var amount=parseInt(amt)
  return db.User.findOne({
acno,
pswd
  }).then(user=>{
    if(user){
      user.balance+=amount;
      user.transaction.push({
        type:"credit",
        amount:amount
      
  })
  user.save()
  return  {
    status:true,
   message:"Deposited successfully......New balance is"+user.balance,
    statuscode:200
   
  }
}
    else
    {
     
      return{
         status:false,
        message:"Incorrect password!......",
        statuscode:401
      }
    }
  

})
}  
const withdraw=(acno,pswd,amt)=>{
  
  var amount=parseInt(amt)
  return db.User.findOne({
    acno,
    pswd,
    amt
  }).then(user=>{
    if(user){
      if(user.balance>amount){
        user.balance-=amount;
      user.transaction.push({
        type:"debit",
        amount:amount
      })
      user.save()
    return{
      status:true,
      message:"withdrawed successfully......New balance is"+user.balance,
       statuscode:200
    }
  }
  else{
    return {
      status:false,
      message:"insufficient balance",
      statuscode:401
     }
  }
}
  else{
     return {
    status:false,
    message:"Incorrect password",
    statuscode:401
  } 
}
})
}
const getTransaction=(acno)=>{
  return db.User.findOne({
    acno
  }).then(user=>{
    if(user){
    return {
      status:true,
      statuscode:200,
      transaction:user.transaction
     
    }
  }
  else{
    return {
      status:false,
      message:"user not exists......",
        statuscode:401
    }
  }
 })
}
 
   //asynchronous
//       if(acno in db)
//       {
//         return { 
//           status:false,
//           message:"Already REgistered .Please Login!......",
//           statuscode:401
//         }
        
//       }
// //       else{
//         db[acno]={
//           acno,
//           username,
//         password,
//          "balance":0,
//          transaction:[]

//         }
//         console.log(db)
//         return { 
//           status:true,
//           message:"registed successfully......",
//           statuscode:200
//         }
//       }
//   }


//  const deposit=(acno,pswd,amt)=>{
  
//     var amount=parseInt(amt)
//     if(acno in db)
//     {
//       if(pswd ==db[acno]["password"])
//             {
//               db[acno]["balance"]+=amount;
//               db[acno].transaction.push({
//                 type:"credit",
//                 amount:amount
//               })
             
//               return  {
//                 status:true,
//                message:"Deposited successfully......New balance is"+ db[acno]["balance"],
//                 statuscode:200
               
//               }
             
//       }
//       else
//       {
       
//         return{
//            status:false,
//           message:"Incorrect password!......",
//           statuscode:401
//         } 
//       }
//     }
//     else
//     {
     
//       return{
//         status:false,
//         message:"user doesnot Exist!......",
//         statuscode:401
//     }
//   }
//   }

  // const withdraw=(acno,pswd,amt)=>{
  
  //   var amount=parseInt(amt)

  //   if(acno in db)
  //   {
  //     if(pswd ==db[acno]["password"])
  //           {
  //             if(db[acno]["balance"]>amount)
  //             {
  //               db[acno]["balance"]-=amount;
  //               db[acno].transaction.push({
  //                 type:"debit",
  //                 amount:amount
  //               })
                
  //               return{
  //                 status:true,
  //                 message:"withdrawed successfully......New balance is"+db[acno]["balance"],
  //                  statuscode:200
                  
  //               } 
  //             }
  //            else{
  //               return {
  //               status:false,
  //               message:"insufficient balance",
  //               statuscode:401
  //              }
  //            }     

  //     }
  //     else
  //     { return {
  //       status:false,
  //       message:"Incorrect password",
  //       statuscode:401
  //     } 
        
  //     }
  //   }
  //   else
  //   {
  //     return{
  //       status:false,
  //       message:"user doesnot Exist!......",
  //       statuscode:401
  //   }
  // }

  // }



//   const login=(acno,pswd)=>{
  
//    if(acno in db)
//    {   
//      if(pswd == db[acno]["password"])
//      {
//       currentUser=db[acno]["username"]
//       currentAcno=acno
//       //token generation
//        token= jwt.sign({
//           //store as key value
//           currentAcno:acno
//         },'supersecretkey12345')
//         return {
//           status:true,
//           message:"Login successfully......",
//           statuscode:200,
//           currentUser,
//           currentAcno,
//           token
//         }
  
//      }
//      else{
      
//        return {
//         status:false,
//         message:"Incorrect password......",
//         statuscode:401
//        }
       
//      }
//    }
//    else
//    {
    
//     return{ 
//        status:false,
//         message:"user not exists......",
//         statuscode:401
//    }
  
//   }
// }

// const getTransaction=(acno)=>{
//   if(acno in db){
//     return {
//       status:true,
//       transaction:db[acno].transaction,
//         statuscode:200
//     }
//   }
//   else{
//     return {
//       status:false,
//       message:"user not exists......",
//         statuscode:401
//     }
//   }
 
//  }

   //export
   module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
 }