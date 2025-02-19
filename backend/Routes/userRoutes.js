
const {registerUser,loginUser,currentUser}=require('../Controllers/UserController');
const router=require('express').Router();
const validateToken=require('../middleware/validateToken');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/current',validateToken,currentUser);

module.exports=router;