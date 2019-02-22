"use strict";

var should = require('should'),
	request = require('supertest'),
	app = require('../../server.js'),
	mongoose = require('mongoose'),
	VehicleOwner = mongoose.model('VehicleOwner'),
	agent = request.agent(app);

describe('VehicleOwner CRUD integration testing', function () {

	describe('Get all vehicleowner', function () {

		before(function (done) {
			var newVehicleOwner = { vehicleowner: "VehicleOwner from hooks" };
			agent
			.post('/api/vehicleowners')
			.end(function(){
				done();
			})
		});

		it('Should get status equal success and array of vehicleowner', function (done) {
			agent
			.get('/api/vehicleowners')
			.expect(200)
			.end(function(err, results){
				results.body.status.should.equal(true);
				done();
			});
		});
		
	});
	
	describe('Post a vehicleowner', function () {
		it('Should allow post to post a vehicleowner and return _id', function (done) {
			var params = { vehicleowner: "VehicleOwner fro testing" };
			agent
			.post('/api/vehicleowners')
			.send(params)
			.expect(200)
			.end(function(err, results){
				results.body.vehicleowner.completed.should.equal(false);
				results.body.vehicleowner.should.have.property('_id');
				done();
			});
		});
	});
	
	describe('Delete a vehicleowner', function () {
		var id;
		before(function (done) {
			var params = { vehicleowner: "VehicleOwner from hooks to delete" };
			agent
			.post('/api/vehicleowners')
			.send(params)
			.end(function(err, result){
				id = result.body.vehicleowner._id;
				done();
			})
		});

		it('Should delete the vehicleowner by _id', function (done) {
			agent
			.delete('/api/vehicleowners/'+id)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});

	});

	describe('Update a vehicleowner', function () {
		var id;
		before(function (done) {
			var newVehicleOwner = { vehicleowner: "VehicleOwner from hooks to update" };
			agent
			.post('/api/vehicleowners')
			.send(newVehicleOwner)
			.end(function(err, result){
				id = result.body.vehicleowner._id;
				done();
			})
		});

		it('Should update the completed status of vehicleowner by _id to true', function (done) {
			var params = { completed: true };
			agent
			.put('/api/vehicleowners/'+id)
			.send(params)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});
	});

});

