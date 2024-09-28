import express from "express";
import dotenv from "dotenv";

import recipeRoutes from "./routes/recipe.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectToDB from "./config/db.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/recipe", recipeRoutes);
app.use("/api/auth",authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
