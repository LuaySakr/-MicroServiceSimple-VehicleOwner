var config = {
	port: process.env.PORT || 7003,
	db: process.env.MONGOLAB_URI || "mongodb://mongodb/vehicleowner",
	test_port: 8003,
	test_db: "mongodb://mongodb/vehicleownerapi_test"
}
module.exports = config;