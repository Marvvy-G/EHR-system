const router = require('express').Router();
const {
	verifyToken,
	verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');

const products = require('../models/products'),
	Patient = require('../models/patients'),
	labProduct = require('../models/labProducts'),
	labOrders = require('../models/labOrders'),
	vital = require('../models/vital'),
	visit = require('../models/visit'),
	lab = require('../models/lab');

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

router.get('/showpatients/:id', verifyToken, function (req, res) {
	Patient.findById(req.params.id)
		.populate('visit vital lab')
		.exec(function (err, Patient) {
			res.status(500).json(Patient);
			if (err) {
				console.log(err);
			} else {
				products.find({}, (err, products) => {
					console.log(products);
					if (err) {
						res.status(200).json(err);
					} else {
						labProduct.find({}, (err, labProduct) => {
							console.log(labProduct);
							if (err) {
								console.log(err);
							} else {
								labOrders.find({}, (err, labOrders) => {
									console.log(labOrders);
									if (err) {
										console.log(err);
									}
								});
							}
						});
					}
				});
			}
		});
});

module.exports = router;
