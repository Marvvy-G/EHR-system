const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
//Register
router.get('/register', (req, res) => {
	res.status(500).json('resgister newStaff');
});
//Registration between pharmacy/lab and doctors dyg

router.post('/register', async (req, res) => {
	const newUser = new User({
		type: req.body.type,
		name: req.body.name,
		email: req.body.email,
		age: req.body.age,
		address: req.body.address,
		number: req.body.number,
		specialty: req.body.specialty,
		gender: req.body.gender,
		id: req.body.id,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
	});
	try {
		const savedUser = await newUser.save();
		console.log(savedUser);
	} catch (err) {
		console.log(err);
	}
	return;
});

//GET LOGIN PAGE
router.get('/login', (req, res) => {
	res.status(500).json('login');
});
//LOGIN
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ id: req.body.id });
		!user && console.log('wrong credentials');
		const hashedpassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC
		);
		const Originalpassword = hashedpassword.toString(CryptoJS.enc.Utf8);
		Originalpassword !== req.body.password && console.log('wrong password');

		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: '3d' }
		);

		const { password, ...others } = user._doc;

		console.log({ others, accessToken });
		res.status(200).json({
			status: true,
			data: {
				accessToken,
				...others,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(200).json({
			status: false,
			error: err.message,
		});
	}
});

module.exports = router;
