const mongoose = require('mongoose');

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
	boxOffice: Number,
	archived: { type: Boolean, default: false },
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
			year: this.year,
			released: this.released,
			runtime: this.runtime,
			genres: this.genres,
			directors: this.directors,
			writers: this.writers,
			actors: this.actors,
			plot: this.plot,
			language: this.language,
			country: this.country,
			poster: this.poster,
			rottenTomatoesRating: this.rottenTomatoesRating,
			metascore: this.metascore,
			imdbRating: this.imdbRating,
			imdbVotes: this.imdbVotes,
			imdbId: this.imdbId,
			boxOffice: this.boxOffice,
		} : view;
	},
};

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
