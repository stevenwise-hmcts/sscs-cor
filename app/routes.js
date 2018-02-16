var express = require('express')
var router = express.Router()

// Route index page

router.get('/', function (req, res) {
  res.render('index')
})



// Evidence options

router.get('/evidence-options', function (req, res) {
	console.log(req.query);
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

router.get('/question-walking', function (req, res) {
	res.render('question-walking', { completed: req.query.completed });
})

router.post('/question-walking', function (req, res) {
	res.redirect('/task-list?walkingCompletedOrDraft=draft');
});


router.get('/task-list', function (req, res) {
	console.log(req.query.walkingCompletedOrDraft);

	const icons = {
		walking: req.query.walkingCompletedOrDraft
	};

	res.render('task-list', icons);
});



// Extend a deadline

router.get('/extend-are-sure', function (req, res) {
	console.log(req.query);
	res.render('extend-are-sure');
})

router.post('/extend-are-sure', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/extend-confirm')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/extend-no')
	}

})


// Hearing required

router.get('/hearing-required', function (req, res) {
	console.log(req.query);
	res.render('hearing-required');
})

router.post('/hearing-required', function (req, res) {

	if (req.body['radio-group'] === 'Yes I want a hearing') {
		res.redirect('/hearing-requirements-start')
	} else if (req.body['radio-group'] === 'No I don’t want a hearing') {
		res.redirect('/hearing-required-why-not-attending')
	}

})


// Decicion accept or hearing

router.get('/decision-positive', function (req, res) {
	console.log(req.query);
	res.render('decision-positive');
})

router.post('/decision-positive', function (req, res) {

	if (req.body['radio-group'] === 'accept the decision') {
		res.redirect('/decision-accepted')
	} else if (req.body['radio-group'] === 'want a hearing') {
		res.redirect('/hearing-explain-why')
	}

})


// add your routes here

module.exports = router
