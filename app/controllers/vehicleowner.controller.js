"use strict";

var VehicleOwnerCtrl = function(VehicleOwner){

	var VehicleOwnerObj = {};

	VehicleOwnerObj.PostVehicleOwner = function(req, res, next){
		var newVehicleOwner = new VehicleOwner(req.body);
		newVehicleOwner.save(function(err, vehicleowner){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, number: req.body});
		});
	}

	VehicleOwnerObj.GetVehicleOwner = function(req, res, next){
		VehicleOwner.find(function(err, vehicleowner){
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, vehicleowner: vehicleowner});
		});
	}

	VehicleOwnerObj.UpdateVehicleOwner = function(req, res, next){
		console.log(req.body)
		// var completed = req.body.completed;
		VehicleOwner.findById(req.body._id, function(err, vehicleowner){
			// vehicleowner.completed = vehicleowner.completed;
			console.log(req.body.status)
			vehicleowner.status=req.body.status;
			vehicleowner.save(function(err, vehicleowner){
				if(err) {
					res.json({status: false, error: "Status not updated"});
				}
				res.json({status: true, message: "Status updated successfully"});
			});
		});
	}

	VehicleOwnerObj.DeleteVehicleOwner = function(req, res, next){
		VehicleOwner.remove({number : req.params.number }, function(err, vehicleowner){
			if(err) {
				res.json({status: false, error: "Deleting vehicleowner is not successfull"});
			}
			res.json({status: true, message: "VehicleOwner deleted successfully"});
		});
	}

	return VehicleOwnerObj;
}

module.exports = VehicleOwnerCtrl;
