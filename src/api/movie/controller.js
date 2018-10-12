const _ = require('lodash');
const { success, notFound } = require('../../services/response/');
const Movie = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = ({ body, user }, res, next) => {
	return Movie.create(body)
		.then(movie => movie.view(true))
		.then((movie) => res.status(201).json(movie))
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	Movie.find({ archived: { $ne: true } }, select, cursor)
		.then(movie => movie.map(movieObject => movieObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	Movie.findById(params.id)
		.then(notFound(res))
		.then(movie => (movie ? movie.view() : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	Movie.findById(params.id)
		.then(notFound(res))
		.then(movie => (movie ? _.extend(movie, body).save() : null))
		.then(movie => (movie ? movie.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	Movie.findById(params.id)
		.then(notFound(res))
		.then(movie => (movie ? movie.remove() : null))
		.then(success(res, 204))
		.catch(next);
