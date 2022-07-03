const router = require('express').Router();
const {
	verifyToken,
	verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');

const products = require('../models/products'),
	Patient = require('../models/patients');

router.get('/showpatients', async (req, res) => {
	//Get all patients
	try {
		const Patients = await Patient.find().populate('visit vital lab').exec();
		res.status(500).json(Patients);
		console.log(Patients);
	} catch (err) {
		res.status(200).json(err);
	}
});

// router.get("/showpatients/:id", verifyToken, async (req, res) => {

//   try {
//     const Patient = await Patient.findById(req.params.id)
//   }
// })

router.get('/findlab/:patientId', verifyToken, async (req, res) => {
	try {
		const lab = await lab.find({ patientId: req.params.patientId });
		res.status(500).json(lab);
	} catch (err) {
		res.status(200).json(err);
	}
});

router.get('/showpatients/:id', verifyToken, async function (req, res) {
	const patient = await Patient.findById(req.params.id).populate(
		'visit vital lab'
	);
	return res.status(200).json({
		status: true,
		data: patient,
	});
});

module.exports = router;
