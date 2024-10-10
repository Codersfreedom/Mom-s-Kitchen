import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import path from "path";

import recipeRoutes from "./routes/recipe.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import edamamRoutes from "./routes/edamam.routes.js";
import connectToDB from "./config/db.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());


app.use("/api/recipe", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/edamam", edamamRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
