var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log("sadadsad")
//   User.find({})
//     .then((users) => {
//       res.render('mongoose', { users });
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// });

// 위의 같은 코드를 async를 이용하여 바꾸어 보자!
router.get('/', async (req, res, next) => {
  try{
    console.log("여기까진")
    const users = await User.find();
    res.render('mongoose', { users });
  } catch(err){
    console.error(err);
    next(err);
  }
})

module.exports = router;
