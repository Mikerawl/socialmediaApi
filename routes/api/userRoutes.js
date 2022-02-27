const router = require('express').Router();

const {  getUsers, getById, createUser,  updateUser, deleteUser, friendslistAdd } = require('../../controllers/useController');


router
  .route('/')
  .get(getUsers)
  .post(createUser);


router
  .route('/:id')
  .get(getById)
  .put(updateUser)
  .delete(deleteUser)



router
  .route('/:id/friends/:friendsId')
  .post(friendslistAdd)


module.exports = router;