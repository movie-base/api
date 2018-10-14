const _ = require('lodash');
const { success, notFound } = require('../../services/response/');

exports.index = ({ querymen: { query, select, cursor }, user }, res, next) => {
	return res.json({
		user: user.id,
	});
};
