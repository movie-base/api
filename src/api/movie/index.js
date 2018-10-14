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
 * @api {post} /movies Create Movie
 * @apiName CreateMovie
 * @apiGroup Movie
 * @apiPerMovie user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Movie Movie's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Movie not found.
 * @apiError 401 user access only.
 */
router.post(
	'/',
	token({ required: true, roles: ['admin'] }),
	create,
);

/**
 * @api {get} /movies Retrieve movie
 * @apiName RetrieveMovie
 * @apiGroup Movie
 * @apiPerMovie admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} movie List of movie.
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
 * @api {get} /movies/:id Retrieve Movie
 * @apiName RetrieveMovie
 * @apiGroup Movie
 * @apiPerMovie user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Movie Movie's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Movie not found.
 * @apiError 401 user access only.
 */
router.get(
	'/:id',
	token({ required: true }),
	show,
);

/**
 * @api {put} /movies/:id Update Movie
 * @apiName UpdateMovie
 * @apiGroup Movie
 * @apiPerMovie user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Movie Movie's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Movie not found.
 * @apiError 401 user access only.
 */
router.put(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	update,
);

/**
 * @api {delete} /movies/:id Delete Movie
 * @apiName DeleteMovie
 * @apiGroup Movie
 * @apiPerMovie admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Movie not found.
 * @apiError 401 admin access only.
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
