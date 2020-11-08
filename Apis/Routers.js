const router = require('express').Router();
const Apis = require('./Apis');

router.post('/login', Apis.login)
router.post('/register', Apis.register)
router.get('/dashboard', Apis.fetchChats)
router.post('/fetchSingle', Apis.fetchSingleChat)
router.get('/logout', Apis.logoutUser)
router.get('/users', Apis.getUsers)
router.post('/newChat', Apis.newChat)

module.exports = router;