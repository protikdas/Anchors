const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {type: String, required: true, unique: true},
    country: {type: String, required: true}, 
    users: [{type: Schema.Types.ObjectId, ref: "User"}],
    vessels: [{type: Schema.Types.ObjectId, ref: "Vessel"}]
})

const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;