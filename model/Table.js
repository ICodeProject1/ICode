import { Schema, model, models } from "mongoose";

const tableSchema = new Schema({
  name: String,
  starting: Number,
  attendance: Number,
  bonus: Number,
  tasks: Number,
  attitude: Number,
  role: String,
  session: Number,
  newTable: Boolean,
});

const Table = models.table || model("table", tableSchema);

export default Table;
