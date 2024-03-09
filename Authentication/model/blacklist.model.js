const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
	blacklistesToken:String
})

const blackModel = mongoose.model("blacklistedToken", blacklistSchema)

module.exports = {
	blackModel
}