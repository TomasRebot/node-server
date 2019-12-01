const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//date format is yyyy-mm-dd
const todoSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    status: {
        type: String,
        enum: ['finished','pending'],
        default: 'pending'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});
const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;
