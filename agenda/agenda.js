const Agenda = require("agenda");
const dotenv = require("dotenv");

const db = require("../models/db.js");
const Mongoose = db.mongoose;

dotenv.config();

const agenda = new Agenda();
// When mongoose is connected to MongoDB
db.dbConnect.then(function() {
	agenda.mongo(Mongoose.connection.db, "jobs");
});

const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(",") : [];

jobTypes.forEach((type) => {
	require("./jobs/" + type)(agenda);
});

if (jobTypes.length) {
	agenda.start();
}

module.exports = agenda;