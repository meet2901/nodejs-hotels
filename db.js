const mongoose=require("mongoose");


//mongodb database URL 
const mongoURL="mongodb://localhost:27017/hotels"


//giving conection of databases on URL
mongoose.connect(mongoURL,{
    useNEWUrlparser:true,
})


//crerate a object for database connectivity
const db=mongoose.connection;

//checking connection pf databases where database are connected,disconnected or  error
db.on("connected",()=>{
    console.log("data base conected sucessfuly");
})


db.on("error",(err)=>{
    console.error("something error in database conection",err);
})


db.on("disconnected",()=>{
    console.log("data base disconnected ");
})

//export database file to the main server file 
module.exports=db; 