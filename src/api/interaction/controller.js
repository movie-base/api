const _ = require('lodash');
const { success, notFound } = require('../../services/response/');
const Interaction = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = async ({ body, user }, res, next) => {
	const userId = body.user ? body.user : user.id;
	const existingInteraction = await Interaction
		.findOneAndUpdate({ user: userId, movie: body.movie }, body)
		.populate('movie');
	if (existingInteraction) return res.status(200).json({ ...existingInteraction, ...body });
	const newInteraction = await Interaction.create({ user: userId, ...body })
		.then(interaction => interaction.view(true))
		.catch(next);
	await Interaction.findById(newInteraction.id)
		.populate('movie')
		.then(interaction => res.status(201).json(interaction))
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor }, user }, res, next) =>
	Interaction.find({ ...query, archived: { $ne: true }, user: user.id }, select, cursor)
		.populate('movie')
		.then(interaction => interaction.map(interactionObject => interactionObject.view(true)))
		.then(success(res))
		.catch(next);

exports.showUserInteractions = ({ params }, res, next) =>
	Interaction.find({ archived: { $ne: true }, user: params.userId })
		.then(interaction => interaction.map(interactionObject => interactionObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	Interaction.findById(params.id)
		.then(notFound(res))
		.then(interaction => (interaction ? interaction.view(true) : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	Interaction.findById(params.id)
		.then(notFound(res))
		.then(interaction => (interaction ? _.extend(interaction, body).save() : null))
		.then(interaction => (interaction ? interaction.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	Interaction.findById(params.id)
		.then(notFound(res))
		.then(interaction => (interaction ? interaction.remove() : null))
		.then(success(res, 204))
		.catch(next);
