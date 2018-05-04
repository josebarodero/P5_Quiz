var express = require('express');
var router = express.Router();
const sequelize = require('../models/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'P5_Quiz' });
});


/*GET credits*/

router.get('/credits', function(req, res, next) {
    res.render('credits', { title: 'Créditos' });
});

/*GET quizzes*/

router.get('/quizzes', function(req, res, next) {
    sequelize.models.quiz.findAll()
        .then(quizzes => {
        res.render('quizzes', {quizzes});
    })
   .catch(error => {

    });
});

module.exports = router;
