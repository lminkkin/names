import nameModel from "../models/nameModel.js";

export const getAllNames = async (req, res) => {
    const names = await nameModel.find().sort(
        {"amount": -1}
    );
    if (names) {
        res.json(names);
    } else {
        res.status(404).end();
    }
};

export const getName = async (req, res) => {
    const { searchString } = req.params;
    const foundName = await nameModel.find(
        { name: { $regex: searchString, $options: "i" } }
    );
    if (foundName) {
        res.json(foundName);
    } else {
        res.status(404).end();
    }
};