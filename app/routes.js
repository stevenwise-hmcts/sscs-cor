var express = require('express');
var router = express.Router();

const multer      = require("multer")
const upload      = multer({dest:'uploads/'})

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

router.get('/task-list', function (req, res) {
    res.render('task-list');
});

// Question - Walking

router.get('/question-walking', function (req, res) {
	res.render('question-walking');
})

router.post('/question-walking', function (req, res) {
	res.redirect('/task-list-extend?walkingCompletedOrDraft=draft');
});

// Question - interacting

router.get('/question-interacting', function (req, res) {
	res.render('question-interacting');
})

router.post('/question-interacting', function (req, res) {
	res.redirect('/task-list-upload?interactingCompletedOrDraft=draft');
});


// Question - Migraine

router.get('/question-migraine', function (req, res) {
	res.render('question-migraine');
})

router.post('/question-migraine', function (req, res) {
	res.redirect('/task-list-extend?migraineCompletedOrDraft=draft');
});


// Question - Mobility - Round 2

router.get('/question-mobility', function (req, res) {
	res.render('question-mobility');
})

router.post('/question-mobility', function (req, res) {
	res.redirect('/task-list-r2?mobilityCompletedOrDraft=draft');
});




// Question - Medical records

router.get('/question-medical-records', function (req, res) {
	console.log(req.query);
	res.render('question-medical-records');
})

router.post('/question-medical-records', function (req, res) {

	if (req.body['radio-group'] === 'Yes I give permission') {
		res.redirect('/medical-records-yes')
	} else if (req.body['radio-group'] === 'No I don’t give permission') {
		res.redirect('/medical-records-no')
	}

})


// Question - Medical records - Round 2

router.get('/medical-records-yes', function (req, res) {
	res.render('medical-records-yes');
})

router.post('/medical-records-yes', function (req, res) {
	res.redirect('/task-list-r2?medicalCompletedOrDraft=draft');
});


router.get('/evidence-upload-interact', function (req, res) {
	res.render('evidence-upload-interact');
});

router.get('/question-interacting-upload', function (req, res) {
    res.render('question-interacting-upload');
});

router.post('/evidence-upload-interact', upload.array('fileUpload'), function (req, res) {
    req.session.data['filesUploaded'] = req.files ? req.files : '';
    req.session.data['describeTheEvidence'] = req.body.describeTheEvidence ? req.body.describeTheEvidence : '';
    res.status(201).end()
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
	}  else if (req.body['radio-group'] === 'Longer') {
		res.redirect('/extend-longer')
}
})


// Extend a deadline3

router.get('/extend-are-sure3', function (req, res) {
	console.log(req.query);
	res.render('extend-are-sure3');
})

router.post('/extend-are-sure3', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/extend-longer2')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/extend-no')
}
})



// Decision accept or hearing

router.get('/decision-view', function (req, res) {
	console.log(req.query);
	res.render('decision-view');
})

router.post('/decision-view', function (req, res) {

	if (req.body['radio-group'] === 'accept the decision') {
		res.redirect('/decision-view-accepted')
	} else if (req.body['radio-group'] === 'want a hearing') {
		res.redirect('/hearing-confirm')
	}

})


// Hearing confirm

router.get('/hearing-confirm', function (req, res) {
	console.log(req.query);
	res.render('hearing-confirm');
})

router.post('/hearing-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/hearing-explain-why')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/decision-view')
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
		res.redirect('/hearing-telephone')
	}

})





// Telephone hearing

router.get('/hearing-telephone', function (req, res) {
	console.log(req.query);
	res.render('hearing-telephone');
})

router.post('/hearing-telephone', function (req, res) {

	if (req.body['radio-group'] === 'yes telephone hearing') {
		res.redirect('/hearing-telephone-yes')
	} else if (req.body['radio-group'] === 'no telephone hearing') {
		res.redirect('/hearing-telephone-no')
	}

})

// add your routes here

module.exports = router
