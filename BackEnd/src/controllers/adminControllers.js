const db = require("../models/index");
const joi = require("joi").extend(require('@joi/date'));

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await db.Recipes.findAll({
            include: [
                {
                    model: db.Ingredients,
                    as: "ingredients"
                },
                {
                    model: db.Steps,
                    as: "steps"
                }
            ]
        });
        res.status(200).send(recipes);
    } catch (err) {
        res.status(500).send(err);
    }
}