const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const vesselSchema = new Schema({
    vesselName: {type: String, required: true, unique: true},
    homePort: {type: Schema.Types.ObjectId, ref: "Port"},
    // company: {type: Schema.Types.ObjectId, ref: "Port"},
    capacity: {type: Number, required: true},
    trips: [{type: Schema.Types.ObjectId, ref: "Trip"}],
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

const VesselModel = mongoose.model('User', vesselSchema);

module.exports = VesselModel;