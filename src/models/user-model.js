const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    name: String,
    lastName: String,
    password: { type: String, required: true},
    email: {type: String, unique:true},
    token: String,
    thingsTodo:[{
        type: Schema.Types.ObjectId,
        ref:'todo'
    }]
});

// do password for user
userSchema.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }
    this.email = this.email.toLowerCase();
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt).then( hash => {
            this.password = hash;
            return next();
        }).catch(err => {next(err)});
    });
});




const User = mongoose.model('user', userSchema);

module.exports = User;
