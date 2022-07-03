const router = require('express').Router();
const Order = require('../models/order');
const Patient = require('../models/patients');
const {
	verifyToken,
	verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');

router.get('/showpatients', verifyToken, function (req, res) {
	//get patients for pharmacist
	Patient.find({}, function (err, allPatients) {
		res.status(500).json(allPatients);
		if (err) {
			res.status(200).json(err);
		}
	});
});

router.get('/showpatients/:id', verifyToken, function (req, res) {
	Patient.findById(req.params.id, function (err, patient) {
		res.status(500).json(patient);
		if (err) {
			console.log(err);
		}
	});
});

//Get patient prescription
router.get('/findpatient/:patientId', verifyToken, async (req, res) => {
	try {
		const orders = await Order.find({ patientId: req.params.patientId });
		res.status(500).json(orders);
	} catch (err) {
		res.status(200).json(err);
	}
});

module.exports = router;
