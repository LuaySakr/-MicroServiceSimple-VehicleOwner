"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

var VehicleOwnerModel = require('../../../app/models/vehicleowner.model');

describe('VehicleOwnerController testing', function () {

	describe('VehicleOwner Post test', function () {
		
		it('Should call save only once', function () {
			var saveStub = sinon.stub();
			function Book(){
				this.save = saveStub
			}
			var req = {
				body: {
					vehicleowner: "Test vehicleowner from mock"
				}
			}
			var res = {}, next = {};
			var VehicleOwnerController = require('../../../app/controllers/vehicleowner.controller')(Book);
			VehicleOwnerController.PostVehicleOwner(req, res, next);
			sinon.assert.calledOnce(saveStub);
		});

		it('Should save vehicleowner', function (done) {
			var vehicleownerMock = sinon.mock(new VehicleOwnerModel({ vehicleowner: 'Save new vehicleowner from mock'}));
			var vehicleowner = vehicleownerMock.object;

			vehicleownerMock
			.expects('save')
			.yields(null, 'SAVED');

			vehicleowner.save(function(err, result) {
				vehicleownerMock.verify();
				vehicleownerMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});

	});

	describe('Get all VehicleOwner test', function () {
		it('Should call find once', function (done) {
			var VehicleOwnerMock = sinon.mock(VehicleOwnerModel);
			VehicleOwnerMock
			.expects('find')
			.yields(null, 'VEHICLEOWNERS');

			VehicleOwnerModel.find(function (err, result) {
				VehicleOwnerMock.verify();
				VehicleOwnerMock.restore();
				should.equal('VEHICLEOWNERS', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Delete vehicleowner test', function () {
		it('Should delete vehicleowner of gived id', function (done) {
			var VehicleOwnerMock = sinon.mock(VehicleOwnerModel);

			VehicleOwnerMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');

			VehicleOwnerModel.remove({_id: 12345}, function(err, result){
				VehicleOwnerMock.verify();
				VehicleOwnerMock.restore();
				done();
			})


		});
	});

	describe('Update a vehicleowner', function () {
		it('Should update the vehicleowner with new value', function (done) {
			var vehicleownerMock = sinon.mock(new VehicleOwnerModel({ vehicleowner: 'Save new vehicleowner from mock'}));
			var vehicleowner = vehicleownerMock.object;

			vehicleownerMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');

			vehicleowner.save({_id: 12345}, function(err, result){
				vehicleownerMock.verify();
				vehicleownerMock.restore();
				done();
			})

		});
	});

});