import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
  subjects: [String],
  attendance: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
