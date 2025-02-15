const mongoose = require("mongoose");
const joi = require("joi");

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoList");

const taskSchema = mongoose.Schema({
    taskTitle : {
        type : String,
        required:true,
    },
    taskDesc : {
        type:String,
        required:true,
        },
})

module.exports = mongoose.model("task",taskSchema);