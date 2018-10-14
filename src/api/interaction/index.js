const { Router } = require('express');
const { middleware: query } = require('querymen');
const { token } = require('../../services/passport');
const {
	create, index, show, update, destroy,
} = require('./controller');

const router = new Router();

/**
 * CUSTOM ROUTES
 */


/**
	* GENERIC ROUTES (do not modify these)
	*/

/**
 * @api {post} /interactions Create Interaction
 * @apiName CreateInteraction
 * @apiGroup Interaction
 * @apiPerInteraction user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Interaction Interaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Interaction not found.
 * @apiError 401 user access only.
 */
router.post(
	'/',
	token({ required: true }),
	create,
);

/**
 * @api {get} /interactions Retrieve interaction
 * @apiName RetrieveInteraction
 * @apiGroup Interaction
 * @apiPerInteraction admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} interaction List of interaction.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get(
	'/',
	token({ required: true }),
	query({ limit: { max: 500 } }),
	index,
);

/**
 * @api {get} /interactions/:id Retrieve Interaction
 * @apiName RetrieveInteraction
 * @apiGroup Interaction
 * @apiPerInteraction user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Interaction Interaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Interaction not found.
 * @apiError 401 user access only.
 */
router.get(
	'/:id',
	token({ required: true }),
	show,
);

/**
 * @api {put} /interactions/:id Update Interaction
 * @apiName UpdateInteraction
 * @apiGroup Interaction
 * @apiPerInteraction user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Interaction Interaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Interaction not found.
 * @apiError 401 user access only.
 */
router.put(
	'/:id',
	token({ required: true }),
	update,
);

/**
 * @api {delete} /interactions/:id Delete Interaction
 * @apiName DeleteInteraction
 * @apiGroup Interaction
 * @apiPerInteraction admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Interaction not found.
 * @apiError 401 admin access only.
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
