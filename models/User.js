const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a usermame'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    password: {
        type: String,
        required: true,
        maxlength: [50, 'Description cannot be more than 50 characters']
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);