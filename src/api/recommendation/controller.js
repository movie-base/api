const _ = require('lodash');
const Interaction = require('../interaction/model');

// Max number of similar users comparisons.
const MAX_USER_COMPARISONS = 10;

/**
 * Recommendations - User Collaborative Filtering
 * - Takes into consideration disliked movies
 * - Uses new ML model
 */
exports.index = async ({ user, querymen: { select, cursor } }, res) => {
	// 1. Grab all liked and disliked movies by target user
	const userLikedInteractions = await Interaction
		.find({
			user: user.id,
			hasLiked: true,
			hasWatched: true,
		});
	const userLikedMovies = _.uniq(userLikedInteractions, 'movie')
		.map(interaction => interaction.movie);
	const userDisikedInteractions = await Interaction
		.find({
			user: user.id,
			hasLiked: false,
			hasWatched: true,
		});
	const userDislikedMovies = _.uniq(userDisikedInteractions, 'movie')
		.map(interaction => interaction.movie);
	const userLikedAndDislikedMovies = _.unionWith(
		userLikedMovies,
		userDislikedMovies,
		_.isEqual,
	);
	// 2. Grab users that've watched similar movies
	const similarUserInteractions = await Interaction
		.find({
			$and: [
				{
					user: { $ne: user.id },
					movie: { $in: userLikedMovies },
					hasLiked: true,
					hasWatched: true,
				},
				{ movie: { $nin: userDislikedMovies } },
			],
		});
	// 3. Sort similar users by frequency
	const similarUsers = _.chain(similarUserInteractions)
		.countBy('user')
		.toPairs()
		.sortBy(1)
		.reverse()
		.map(0)
		.splice(0, MAX_USER_COMPARISONS)
		.value();
	// 4. Grab all movies liked by similar users, but not watched by the target user
	const intersectionInteractions = await Interaction.find({
		user: { $in: similarUsers },
		movie: { $nin: userLikedAndDislikedMovies },
		hasLiked: true,
		hasWatched: true,
	}, select, cursor)
		.populate('movie');
	// 5. Based on the intersected movies (ie. movies liked by similar users -
	// and not watched by target user) create a recommendations list
	const movies = _.chain(intersectionInteractions.map(i => i.movie))
		.uniq('id')
		.orderBy('year', 'desc')
		.pull(userLikedAndDislikedMovies)
		.compact()
		.value();
	return res.json({ movies });
};
