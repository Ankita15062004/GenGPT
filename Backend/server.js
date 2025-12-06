import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}



// app.post("/test", async (req, res) => {
//   try {
//     const ai = new GoogleGenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });

//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: req.body.message,
//     });

//     // Extract clean text ONLY
//     const text =
//       response?.candidates?.[0]?.content?.parts
//         ?.map((p) => p.text)
//         .join("\n") || "No reply";

//     // Send plain text response
//     res.setHeader("Content-Type", "text/plain");
//     res.send(text);

//   } catch (err) {
//     console.error("Gemini Error:", err);
//     res.status(500).send("Gemini Request Failed");
//   }
// });

