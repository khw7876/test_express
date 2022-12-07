var express = require('express');
var User = require('../schemas/user')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next){
  console.log("zzzzz")
  User.find({})
    .then((users) =>{
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
      next(err);
    }); 
});

router.post('/', function(req, res, next) {
  const User = new User({
    name : req.body.name,
    age : req.body.age,
    married : req.body.married,
  });
  User.save()
    .then((result) => {
      res.json("성공");
      console.log(result)
      res.status(201).json(result);
    })
    .catch((err) => {
      console.errer(err);
      res.json("실패했습니다.")
      next(err);
    });
});

module.exports = router;
