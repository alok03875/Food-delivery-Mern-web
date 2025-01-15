import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from 'path'
import { fileURLToPath } from "url";

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())         // to parse req from fruntend to backend
app.use(cors())                 // to access backend from any fruntend

connectDB();

const _dirname = path.resolve();

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/food", foodRouter)
app.use("/images", express.static(path.join(__dirname, "uploads")));  
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.use('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
    res.send("API working");
})

app.listen(port, () => {
    console.log(`Server are running on http://localhost:${port}/`)
})
