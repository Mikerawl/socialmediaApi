const router = require('express').Router();

const {
    getThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//sets get and post routes for /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThoughts);

//sets get one, put and delete routes for /api/thoughts:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

//sets post route for /api/thoughts/:thoughtsId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;