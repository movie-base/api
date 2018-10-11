const _ = require('lodash');
const { success, notFound } = require('../../services/response/');
const Entity = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = ({ body, user }, res, next) => {
	return Entity.create(body)
		.then(entity => entity.view(true))
		.then((entity) => res.status(201).json(entity))
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	Entity.find({ archived: { $ne: true } }, select, cursor)
		.then(entity => entity.map(entityObject => entityObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	Entity.findById(params.id)
		.then(notFound(res))
		.then(entity => (entity ? entity.view() : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	Entity.findById(params.id)
		.then(notFound(res))
		.then(entity => (entity ? _.extend(entity, body).save() : null))
		.then(entity => (entity ? entity.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	Entity.findById(params.id)
		.then(notFound(res))
		.then(entity => (entity ? entity.remove() : null))
		.then(success(res, 204))
		.catch(next);
