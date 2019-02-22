var VehicleOwner = require('../models/vehicleowner.model');
var VehicleOwnerController = require('../controllers/vehicleowner.controller')(VehicleOwner);

module.exports = function(app){

	app.get('/api/vehicleowners', VehicleOwnerController.GetVehicleOwner);
	
	app.post('/api/vehicleowners', VehicleOwnerController.PostVehicleOwner);

	app.put('/api/vehicleowners/:vehicleowner_id', VehicleOwnerController.UpdateVehicleOwner);

	app.delete('/api/vehicleowners/:vehicleowner_id', VehicleOwnerController.DeleteVehicleOwner);

}