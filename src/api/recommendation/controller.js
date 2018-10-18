const _ = require('lodash');
const Interaction = require('../interaction/model');
const Movie = require('../movie/model');

exports.index = async ({ user }, res, next) => {
	// // 1. Grab all watched and liked movies from target user's
	// // interactions
	// // output: array of movieIds watched by the target user
	// const userLikedInteractions = await Interaction
	// 	.find({
	// 		user: user.id,
	// 		hasLiked: true,
	// 		hasWatched: true,
	// 	});
	// const userLikedMovies = _.uniq(userLikedInteractions, 'movie')
	// 	.map(interaction => interaction.movie);
	// // 2. Grab users that've watched similar movies
	// // output: array of users with similar watched and liked movies
	// const similarUserInteractions = await Interaction
	// 	.find({
	// 		movie: { $in: userLikedMovies },
	// 		hasLiked: true,
	// 		hasWatched: true,
	// 	});
	// return res.json({
	// 	similarUserInteractions,
	// });


	// // 3. Sort similar users by frequency
	// // output: sorted array of userids
	// const similarUsersfreq = similarUsers.reduce((obj, val) => {
	// 	obj[val] = (obj[val] || 0) + 1;
	// 	return obj;
	// }, {});
	// const similarUsersSorted = Object.keys(similarUsersfreq)
	// 	.sort((a, b) => similarUsersfreq[b] - similarUsersfreq[a]);
	// // 4. Grab all movies watched and liked by similar users, but not watched by
	// // the current user
	// const similarUserMovies = await Interaction.find({
	// 	user: {
	// 		$in: similarUsersSorted.map(id => ObjectId(id)),
	// 	},
	// 	hasLiked: true,
	// 	hasWatched: true,
	// }).map(interaction => interaction.movie);

	const movies = await Movie.find().limit(20);
	return res.json({
		movies,
	});
};
