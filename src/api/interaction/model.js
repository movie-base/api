const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const interactionSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: 'User' },
	movie: { type: ObjectId, ref: 'Movie' },
	hasLiked: Boolean,
	hasWatched: Boolean,
	wantToWatch: Boolean,
	archived: { type: Boolean, default: false },
}, { timestamps: true });

interactionSchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
		return full ? {
			// full view += simple view
			...view,
			user: this.user,
			movie: this.movie,
			hasLiked: this.hasLiked,
			hasWatched: this.hasWatched,
			wantToWatch: this.wantToWatch,
		} : view;
	},
};

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;
