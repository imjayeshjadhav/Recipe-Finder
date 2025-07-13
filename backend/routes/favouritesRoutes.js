import express from "express"
import { addFavourites, deleteFavourite, getFavourite } from "../controllers/favouritesController.js";

const favRouter = express.Router()

favRouter.post("/", addFavourites)

favRouter.get("/:userId", getFavourite )

favRouter.delete("/:userId/:recipeId", deleteFavourite)

export default favRouter;