import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userid:{type:mongoose.Types.ObjectId, required:true},
    product_name: {type:String, required:true},
    creator: {type:String, required:true},
    initial_price: {type:String, required:true},
    current_price: {type:String, required:true},
    last_bidder: {type:String, required:true},
    image_url: {type: String}
});

const Product = mongoose.model('Product', productSchema);



export default Product;