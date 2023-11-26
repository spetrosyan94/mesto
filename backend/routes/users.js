const router = require('express').Router();
const {
  getUserIdValidate,
  userUpdateValidate,
  avatarUpdateValidate,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserMe,
  getUserById,
  patchUser,
  patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', getUserIdValidate, getUserById);
router.patch('/me', userUpdateValidate, patchUser);
router.patch('/me/avatar', avatarUpdateValidate, patchAvatar);

module.exports = router;
