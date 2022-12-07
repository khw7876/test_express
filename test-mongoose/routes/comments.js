const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const comments = await Comment.find({
            commenter : req.params.id
        }).populate('commenter');
        console.log(comments);
        res.status(200).json(comments);
    }
    catch(err){
        console.error(err);
        next(err);
    };
});

router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
        commenter: req.body.id,
        comment: req.body.comment,
        });
        console.log(comment);
        const result = await Comment.populate(comment, { path: 'commenter' });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// // 위의 같은 코드를 화살표 함수를 이용해서 바꾸어 보자!
// ```
// router.post('/', function(req, res, next){
//     Comment.create({commenter : req.body.id, comment: req.body.comment})
//      .then((comment) => {
//         console.log(comment)
//         res.status(201).json(comment);
//      })
//      .catch((err) => {
//         console.log(err)
//         next(err);
//      })
// })
// ```


router.route('/:id')

  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        _id: req.params.id,
      }, {
        comment: req.body.comment,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.remove({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

//  같은 코드를 .then 을 이용해서 바꾸어보기

router.route('/:id')
  .patch(async (req, res, next) => {
    Comment.update({
        _id : req.body.id,
    }, {
        comment : req.body.comment,
    })
     .then((result) => {
        res.status(200).json(result)
     })
     .catch((err) => {
        // res.status(404).error(err)
        console.error(err);
        next(err);
     })
  })
module.exports = router;