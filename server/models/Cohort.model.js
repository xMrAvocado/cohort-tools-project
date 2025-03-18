const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const cohortSchema = new Schema({

    cohortSlug: String,
    cohortName: String,
    program: String,
    format: String, 
    campus: String,
    startDate: String, 
    endDate: String, 
    inProgress: Boolean,
    programManager: String,
    leadTeacher: String,
    totalHours: Number
})

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
