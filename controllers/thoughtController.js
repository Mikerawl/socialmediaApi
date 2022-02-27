const { User, Thoughts } =  require('../models');

const thoughtsController = {
     //  /api/thoughts

    //get all thoughts
    getThoughts(req, res) {
        Thoughts.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(thoughtsData => res.json(thoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // get one thought by id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create thought
    createThoughts({ body }, res) {
        Thoughts.create(body)
        .then(thoughtsData => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtsData._id } },
                { new: true }
            )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.jsonuserData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    // update thought by id
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete thought by id
    deleteThoughts({ params }, res) {
        // delete the thought
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            // delete the reference to deleted thought in user's thought array
            User.findOneAndUpdate(
                { username: thoughtsData.username },
                { $pull: { thoughts: params.id } }
            )
            .then(() => {
                res.json({message: 'Successfully deleted the thought'});
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    },

    // create reaction
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.status(500).json(err));
    },

    // delete reaction
    deleteReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json({message: 'Successfully deleted the reaction'});
        })
        .catch(err => res.status(500).json(err));
    },
};

module.exports = thoughtsController;