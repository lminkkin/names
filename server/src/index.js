import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nameRouter from "./routes/nameRouter.js";
import { importNames } from "./utils.js";

const app = express();

app.use(express.json());
app.use(cors({
    origins: "http://localhost:3000",
    credentials: true,
    methods: "GET, PUT, POST, DELETE",
}));

const mongoUrl = "mongodb://localhost:27017/nameDB";

const connectMongoose = async () => {
    await mongoose.connect(
        mongoUrl,
        { useNewUrlParser : true, useUnifiedTopology : true},
    );
};

connectMongoose();
mongoose.set("useFindAndModify", false);
importNames();

app.use("/name/", nameRouter);

app.listen(5000, () => {
    console.log("Listening to port 5000...")
});