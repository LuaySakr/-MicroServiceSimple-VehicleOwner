var VehicleOwner = require('../models/vehicleowner.model');
var VehicleOwnerController = require('../controllers/vehicleowner.controller')(VehicleOwner);

module.exports = function(app){

	app.get('/api/vehicleowners', VehicleOwnerController.GetVehicleOwner);
	
	app.post('/api/vehicleowners', VehicleOwnerController.PostVehicleOwner);

	app.put('/api/vehicleowners/:number', VehicleOwnerController.UpdateVehicleOwner);

	app.delete('/api/vehicleowners/:number', VehicleOwnerController.DeleteVehicleOwner);

}