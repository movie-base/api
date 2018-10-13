const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema({
	title: String,
	year: String,
	released: String,
	runtime: String,
	genres: [String],
	directors: [String],
	writers: [String],
	actors: [String],
	plot: String,
	language: [String],
	country: String,
	poster: String,
	rottenTomatoesRating: Number,
	metascore: Number,
	imdbRating: Number,
	imdbVotes: Number,
	imdbId: String,
	boxOffice: Number
}, { timestamps: true });

movieSchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			title: this.title,
		};
		return full ? {
			// full view += simple view
			...view,
		} : view;
	},
};

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
