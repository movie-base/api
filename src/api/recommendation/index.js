const { Router } = require('express');
const { middleware: query } = require('querymen');
const { token } = require('../../services/passport');
const { index } = require('./controller');

const router = new Router();

/**
 * @api {get} /recommendations Retrieve recommendation
 * @apiName RetrieveRecommendations
 * @apiGroup Recommendation
 * @apiPerMovie admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} recommendation List of recommendation.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get(
	'/',
	token({ required: true }),
	query({ limit: { max: 500 } }),
	index,
);

module.exports = router;
