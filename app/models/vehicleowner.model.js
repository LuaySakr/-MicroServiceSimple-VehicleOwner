var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// VehicleOwner schema
var VehicleOwnerSchema = new Schema({
	number: Number,
	vehicleId: String,
	customerNum: String,
	status:{ type:Boolean, default: function() {
		return Math.random() >= 0.5;
	} },
	completed: { type:Boolean, default: false },

	created_by: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
VehicleOwnerSchema.pre('save', function(next, done) {
	if(!this.number){
		next(new Error("vehicleowner should not be null"));
	}
  	next();
});

var VehicleOwnerModel = mongoose.model('VehicleOwner', VehicleOwnerSchema);

module.exports = VehicleOwnerModel;