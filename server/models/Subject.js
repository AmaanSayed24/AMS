import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  class: String
});

export default mongoose.model("Subject", subjectSchema);