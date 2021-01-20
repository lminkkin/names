import fs from "fs";
import nameModel from "./models/nameModel.js";

export const importNames = async () => {
    const saveName = async (name) => {
        const nameData = new nameModel(name);
        await nameData.save();
    };

    const name = await nameModel.findOne();
    if (name) {
        console.log("Names found from database, skipping import.");
    } else {
        console.log("No names found from the database, importing names...");
        fs.readFile("./names.json", "utf8", async (error, jsonString) => {
            if (error) {
                console.log("Error reading file");
            } else {
                try {
                    const names = JSON.parse(jsonString)
                    const nameValues = Object.values(names);
                    nameValues.map((element) => {
                        element.map((inner) => {
                            const nameForDB = {
                                name: inner.name,
                                amount: inner.amount,
                            };
                            saveName(nameForDB);
                        });
                    });
                } catch (error2) {
                    console.log(`Error parsing JSON string ${error2}`);
                }
            }
        });
    }
};