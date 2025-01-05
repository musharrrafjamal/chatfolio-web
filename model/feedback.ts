import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number,
  image: {
    url: String,
    ref: String,
  },
}, { timestamps: true });

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
