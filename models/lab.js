const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
    test: String,
    testResult: String,
    price: Number,
    patientId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("lab", labSchema);