var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// VehicleOwner schema
var VehicleOwnerSchema = new Schema({
	vehicleowner: String,
	completed: { type:Boolean, default: false },
	created_by: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
VehicleOwnerSchema.pre('save', function(next, done) {
	if(!this.vehicleowner){
		next(new Error("vehicleowner should not be null"));
	}
  	next();
});

var VehicleOwnerModel = mongoose.model('VehicleOwner', VehicleOwnerSchema);

module.exports = VehicleOwnerModel;