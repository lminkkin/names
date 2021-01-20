import express from "express";
import { 
    getAllNames,
    getName,
} from "../controllers/nameController.js";

const nameRouter = express.Router();

nameRouter.get("/all", getAllNames);
nameRouter.get("/find/:searchString", getName);

export default nameRouter;