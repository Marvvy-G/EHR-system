module.exports = (req, res, next) => {
	const { user } = req;

	if (user.type === 'ADMIN') {
		return next();
	}

	return res.status(403).json({
		status: false,
		message: 'FORBIDDEN',
	});
};
