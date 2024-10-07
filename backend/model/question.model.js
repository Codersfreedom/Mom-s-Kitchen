import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
    questions: [
      {
        query: {
          type: String,
          required: true,
        },
          askedBy: {
            userId: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            image: {
              type: String,
            },
          },
          answers: {
            type: Array,
            default: [],
          },
        
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
