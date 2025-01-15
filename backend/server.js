import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())         // to parse req from fruntend to backend
app.use(cors())                 // to access backend from any fruntend
connectDB();

app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads")); 
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API working");
})

app.listen(port, () => {
    console.log(`Server are running on http://localhost:${port}/`)
})
