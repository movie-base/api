const _ = require('lodash');
const { success, notFound } = require('../../services/response/');
const Interaction = require('../interaction/model');

exports.index = async ({ querymen: { query, select, cursor }, user }, res, next) => {
	// Grab all watched and liked movies from user
	const myMovies = Interaction
		.find({
			user: user.id,
			hasLiked: true,
			hasWatched: true,
		})
		.populate('movie')
		.map(interaction => interaction.movie);
	// Grab users that've watched similar movies

	const
	return res.json({
		user: user.id,
	});
};
