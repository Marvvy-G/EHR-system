const mongoose = require("mongoose");
const Lab = require("./lab");
const Vital = require("./vital")
const Visit = require("./visit");

const patientSchema = new mongoose.Schema({
    photo: String,
    name: String,
    id: Number,
    age: Number,
    address: String,
    number: Number,
    lastvisit: String, 
    gender: String,
    bloodgroup: String,
    genotype : String,
    underlyingillness : String,
    password: {
        type: String,
        required: true,
    },
    visit: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit"
        }
    ],
    vital: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vital"
        }
    ],
    lab: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lab"
        }
    ],
  
},  { timestamps: true}
);

module.exports = mongoose.model("Patients", patientSchema);
