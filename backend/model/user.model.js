import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  favorites: [
    {
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    },
  ],
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
