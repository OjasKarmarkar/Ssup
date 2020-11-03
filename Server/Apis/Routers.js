const router = require('express').Router();
const Apis = require('./Apis');

router.post('/login', Apis.login)
router.post('/register', Apis.register)
router.get('/dashboard', Apis.fetchChats)
router.post('/fetchSingle', Apis.fetchSingleChat)
router.get('/logout', Apis.logoutUser)

module.exports = router;