import express from "express"
import { ENV } from "./config/env.js"
import { db } from "./config/db.js"
import { favouritesTable } from "./db/schema.js"
import job from "./config/cron.js"
import favRouter from "./routes/favouritesRoutes.js"

const app = express()
const PORT = ENV.PORT

if (ENV.NODE_ENV === "production") job.start()

app.use(express.json())

app.use("/api/favourites", favRouter)

app.get("/api/health", (req,res) =>{
    res.status(200).json({success:true})
})

app.listen(PORT,() =>{
    console.log(`server is running on the port ${PORT}`)
})