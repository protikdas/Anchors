const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const vesselSchema = new Schema({
    vesselName: {type: String, required: true, unique},
    capacity: {type: Number, required: true},
    userID: {type: Schema.Types.ObjectId, ref: "Vessel"}
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;