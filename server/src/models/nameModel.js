import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
    name: String,
    amount: Number
});

const nameModel = mongoose.model("name", nameSchema);

export default nameModel;