import express from "express";
import dotenv from "dotenv"; 
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
const app = express()


dotenv.config()

 
const port = process.env.PORT

const __dirname = path.resolve()

app.use(cors({
    origin: [
        "http://localhost:5173",                     // local dev
        "https://your-netlify-app.netlify.app"       // your Netlify frontend
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/chat" , chatRoutes)

// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname,"../frontend/instant/dist")));
    
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../frontend/instant/dist/index.html"))
//     })
// }
// app.listen(port , () => {
//     console.log(`server is running on port ${port} `)
//     ConnectDB();
// })
ConnectDB();
export default app;
