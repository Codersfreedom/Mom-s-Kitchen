import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  questions: [
    {
      query: {
        type: String,
        required: true,
        answers: [
          {
            id: {
              type: String,
            },
            name: {
              type: String,
            },
            image: {
              type: String,
            },
            answer: {
              type: String,
              required: true,
            },
          },
        ],
      },
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
