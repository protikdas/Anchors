const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const tripSchema = new Schema({
    vessel: {type: Schema.Types.ObjectId, ref: "Vessel"},
    startLocation: {type: Point, coordinates: [Number, Number]},
    startTime: {},
    path: [{type: Point, coordinates: [Number, Number]}],
    pathTimes: [],
    endLocation: {type: Point, coordinates: [Number, Number]},
    endTime: {}
})

const VesselModel = mongoose.model('User', vesselSchema);
module.exports = VesselModel;