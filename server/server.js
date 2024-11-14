import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnect from "./configs/mongoose.config.js" 
import router from "./routers/expense.routes.js"


const app = express()
app.use(express.json(), cors ());
dotenv.config();

const PORT = process.env.PORT
		

dbConnect();


app.use("/api", router);


app.listen(PORT, ()=>console.log(`listening on port:${PORT}`));

