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
        date:{
          type:Date,
          default:Date.now(),
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
        answers: [
          {
            answer: {
              type: String,
              required: true,
            },
            answeredBy: {
              userId: {
                type: String,
                required: true,
              },
              name: {
                type: String,
              },
            },
            date: {
              type:Date,
              default:Date.now()
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
