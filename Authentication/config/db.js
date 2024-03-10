/* eslint-disable no-mixed-spaces-and-tabs */
const mongoose = require("mongoose")

								 // connecting express server to mongo data base
								 // mongo local server  |  Database Name
								 //         ||                  ||
								 //         \/                  \/
const connection = mongoose.connect("mongodb://127.0.0.1:27017/auth")

module.exports = {
	connection,
}