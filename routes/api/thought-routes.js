const router = require('express').Router();
const { addThought, getThought, updateThought, getThoughtById, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controllers');

// /api/thoughts
router
    .route('/')
    .get(getThought)
    .post(addThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)



    // /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);



module.exports = router;
