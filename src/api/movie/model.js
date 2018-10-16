const mongoose = require('mongoose');
const mongooseKeywords = require('mongoose-keywords');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	year: {
		type: String,
	},
	released: String,
	runtime: String,
	genres: [String],
	directors: [String],
	writers: [String],
	actors: [String],
	plot: {
		type: String,
	},
	languages: [String],
	country: {
		type: String,
	},
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
			languages: this.languages,
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

movieSchema.index({
	title: 1,
	year: 1,
	released: 1,
	imdbId: 1,
}, { unique: true });
movieSchema.plugin(mongooseKeywords, { paths: ['title', 'year', 'plot', 'country'] });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
