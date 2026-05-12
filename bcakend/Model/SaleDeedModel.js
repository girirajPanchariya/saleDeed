import mongoose from "mongoose";


const saleDeedSchema = new mongoose.Schema({
    SalerName:{type:String,required:true},
    BuyerName:{type:String,required:true},
    PropertyDetails:{type:String,required:true},
    TransactionDetails:{type:String,required:true},
    DateOfSale:{type:Date,required:true},
    SalePrice:{type:Number,required:true},
    Witnesses:[{type:String,required:true}]
});

const SaleDeed = mongoose.model("SaleDeed", saleDeedSchema);

export default SaleDeed;