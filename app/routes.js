var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/evidence-options', function (req, res) {
	res.render('evidence-options');
})

router.post('/evidence-options', function (req, res) {

	if (req.body['radio-group'] === 'Post it') {
		res.redirect('/evidence-post')
	} else if (req.body['radio-group'] === 'Upload it') {
		res.redirect('/evidence-upload')
	} else {
		res.redirect('/evidence-statement')
	}

})

// add your routes here

module.exports = router
