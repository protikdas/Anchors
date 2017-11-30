const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const userSchema = new Schema({
    // fullName: {type: String, required: true},
    // company: {type: String},
    // email: {type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String}
    // vessels: [{type: Schema.Types.ObjectId, ref: "Vessel"}]
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;