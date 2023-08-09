import { Schema, model, models } from "mongoose";

const courseSchema = new Schema({
  title: String,
  subtitle: String,
  description: String,
  image: String,
  pdf: String,
  type: String,
  order: Number,
});

const Course = models.course || model("course", courseSchema);

export default Course;
