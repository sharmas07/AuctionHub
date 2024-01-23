import mongoose from "mongoose";

const bidHistorySchema = mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    History: []
})

const bidHistoryModel = mongoose.model("bidHistoryModal", bidHistorySchema);

export default bidHistoryModel;