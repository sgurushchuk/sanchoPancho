const jwt = require('jsonwebtoken');

const sign = process.env.JWT_SECRET;

module.exports = {
	generate(data) {
		return jwt.sign(data, sign, { expiresIn: '30d' });
	},
	verify(token) {
		return jwt.verify(token, sign, (err, decoded) => {
			if (err) {
				if (err.name === 'TokenExpiredError') {
					return res.status(401).json({ message: 'Token expired' });
				} else if (err.name === 'JsonWebTokenError') {
					return res.status(401).json({ message: 'Invalid token' });
				} else {
					return res.status(500).json({ message: 'Internal server error' });
				}
			}
			console.log(decoded);
		});
	},
};
