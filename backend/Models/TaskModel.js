const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user_id:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref:'User'
    },
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    date:{
        type:Date,
        required:true   
    }
});

const TaskModel = mongoose.model('todos', TaskSchema);
module.exports = TaskModel;