const mongoose= require("mongoose");

const studSchema= new mongoose.Schema({
    isDeleted:{
        type:Boolean
    },
    name:{
        type:String
    },
    gender:{
        type:String
    },
    class:{
        type:String
    },
    age:{
        type:Number
    },
    grade_point:{
        type:Number
    },
    time:{
        type:String
    },
})

const studModel=mongoose.model("studinfo",studSchema);
module.exports=studModel;