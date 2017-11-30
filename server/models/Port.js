const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const portSchema = new Schema({
    portName: {type: String, required: true, unique: true},
    country: {type: String, unique: true},
    location: {
        type: {type: String, required = true},
        coordinates: [{type: Number, required = true}]
    },
    vessels: [{type: Schema.Types.ObjectId, ref: "Vessel"}]
})

const PortModel = mongoose.model('Port', portSchema);

module.exports = PortModel;