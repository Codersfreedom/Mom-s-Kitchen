import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name:{
      type:String,
      
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    prepTime: {
      type: String,
      required: true,
    },
    cookTime: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      default: [],
      required: true,
    },
    directions: {
      type: Array,
      default: [],
      required: true,
    },
    visability: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
