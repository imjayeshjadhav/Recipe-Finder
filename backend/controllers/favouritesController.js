import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { favouritesTable } from "../db/schema.js";

export const addFavourites = async (req,res) =>{
    try {
        const { userId, recipeId, title, image, cookTime, servings } = req.body

        if (!userId || !recipeId || !title ) {
            return res.status(400).json({error :"Missing required fields"})
        }

        const newFavourite = await db.insert(favouritesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        }).returning();

        res.status(201).json(newFavourite[0])

    } catch (error) {
        console.log("Error adding favourite", error)
        res.status(500).json({error:"Something went wrong"})
    }
}

export const getFavourite = async (req,res) =>{
    try {

        const {userId}  = req.params;
        const userFavourites = await db.select().from(favouritesTable).where(eq(favouritesTable.userId, userId))
        res.status(200).json(userFavourites);

    } catch (error) {
        console.log("Error fetching favourite", error)
        res.status(500).json({error:"Something went wrong"})
    }
}

export const deleteFavourite = async (req,res) => {
    try {
        const {userId, recipeId} = req.params

        await db.delete(favouritesTable).where(
            and(eq(favouritesTable.userId, userId), eq(favouritesTable.recipeId, parseInt(recipeId)) )
        )

        res.status(200).json({messsage :"Favourite removed successfully"})

    } catch (error) {
        console.log("Error removing favourite", error)
        res.status(500).json({error:"Something went wrong"})
    }
}