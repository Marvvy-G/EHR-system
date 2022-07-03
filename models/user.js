const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: [
				'DOCTOR',
				'NURSE',
				'LABSCIENTIST',
				'ADMIN',
				'PHARMACIST',
				'HEALTHRECORD',
			],
			required: [1, 'User type is required'],
		},

		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		age: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			require: true,
		},
		address: {
			type: String,
			require: true,
		},
		specialty: {
			type: String,
			require: true,
		},
		number: {
			type: Number,
			require: true,
		},
		gender: {
			type: String,
			require: true,
		},
	},
	{
		timestamp: true,
	}
);

module.exports = mongoose.model('User', UserSchema);
