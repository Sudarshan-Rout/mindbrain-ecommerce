import mongoose from "mongoose";
const  shoeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
})


const ShoeModel = mongoose.model("Shoe",shoeSchema);

export default ShoeModel;