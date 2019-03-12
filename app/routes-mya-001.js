var express = require('express');
var router = express.Router();
var _ = require('lodash');

const crypto = require('crypto');
const path = require('path');
const multer      = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
    });
	}
})
const upload      = multer({ storage });

// Route index page

router.get('/', function (req, res) {
  res.render('index')
})

// Evidence options

router.get('/mya-001/evidence-options', function (req, res) {
	console.log(req.query);
	res.render('mya-001/evidence-options');
})

router.post('/mya-001/evidence-options', function (req, res) {

	if (req.body['radio-group'] === 'Post it') {
		res.redirect('/mya-001/evidence-post')
	} else if (req.body['radio-group'] === 'Upload it') {
		res.redirect('/mya-001/evidence-upload')
	} else {
		res.redirect('/mya-001/evidence-statement')
	}

})

router.get('/appeal-q1', function (req, res) {
    res.render('appeal-q1');
});



// Question - DWP response

router.get('/mya-001/question-dwp-response', function (req, res) {
	res.render('mya-001/question-dwp-response');
})

router.post('/mya-001/question-dwp-response', function (req, res) {
	res.redirect('/mya-001/appeal-dwp-response?dwpresponseCompletedOrDraft=draft');
});



// Question - Walking

router.get('/mya-001/question-walking', function (req, res) {
	res.render('mya-001/question-walking');
})

router.post('/mya-001/question-walking', function (req, res) {
	res.redirect('/mya-001/appeal-manage-questions-r1?walkingCompletedOrDraft=draft#questions');
});


// Question - cooking

router.get('/mya-001/question-cooking', function (req, res) {
	res.render('mya-001/question-cooking');
})

router.post('/mya-001/question-cooking', function (req, res) {
	res.redirect('/mya-001/appeal-manage-questions-r1?cookingCompletedOrDraft=draft#questions');
});






// Question - factory

router.get('/mya-001/question-factory', function (req, res) {
	res.render('mya-001/question-factory');
})

router.post('/mya-001/question-factory', function (req, res) {
	res.redirect('/mya-001/appeal-manage-questions-r1?factoryCompletedOrDraft=draft#questions');
});



// Question - Migraine

router.get('/mya-001/question-migraine', function (req, res) {
	res.render('mya-001/question-migraine');
})

router.post('/mya-001/question-migraine', function (req, res) {
	res.redirect('/mya-001/appeal-q1-extend?migraineCompletedOrDraft=draft');
});


// Question - Mobility - Round 2

router.get('/mya-001/question-mobility', function (req, res) {
	res.render('mya-001/question-mobility');
})

router.post('/mya-001/question-mobility', function (req, res) {
	res.redirect('/mya-001/appeal-q2?mobilityCompletedOrDraft=draft');
});




// Question - Medical records

router.get('/mya-001/question-medical-records', function (req, res) {
	console.log(req.query);
	res.render('mya-001/question-medical-records');
})

router.post('/mya-001/question-medical-records', function (req, res) {

	if (req.body['radio-group'] === 'Yes I give permission') {
		res.redirect('/mya-001/medical-records-yes')
	} else if (req.body['radio-group'] === 'No I don’t give permission') {
		res.redirect('/mya-001/medical-records-no')
	}

})


// Question - Medical records - Round 2

router.get('/mya-001/medical-records-yes', function (req, res) {
	res.render('mya-001/medical-records-yes');
})

router.post('/mya-001/medical-records-yes', function (req, res) {
	res.redirect('mya-001/appeal-q1-r2?medicalCompletedOrDraft=draft');
});


router.get('/mya-001/evidence-upload-interact', function (req, res) {
	res.render('mya-001/evidence-upload-interact');
});

router.get('/mya-001/question-interacting-upload', function (req, res) {
    res.render('mya-001/question-interacting-upload');
});

// Extend a deadline

router.get('/mya-001/extend-are-sure', function (req, res) {
	console.log(req.query);
	res.render('mya-001/extend-are-sure');
})

router.post('/mya-001/extend-are-sure', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mya-001/extend-confirm')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mya-001/extend-no')
	}  else if (req.body['radio-group'] === 'Longer') {
		res.redirect('/mya-001/extend-longer')
}
})


// Extend a deadline2

router.get('/mya-001/extend-are-sure2', function (req, res) {
	console.log(req.query);
	res.render('mya-001/extend-are-sure2');
})

router.post('/mya-001/extend-are-sure2', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mya-001/extend-rejected')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mya-001/extend-no')
}
})


// Extend a deadline3

router.get('/mya-001/extend-are-sure3', function (req, res) {
	console.log(req.query);
	res.render('mya-001/extend-are-sure3');
})

router.post('/mya-001/extend-are-sure3', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mya-001/extend-longer2')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mya-001/extend-no')
}
})



// Decision accept or hearing

router.get('/mya-001/decision-view', function (req, res) {
	console.log(req.query);
	res.render('mya-001/decision-view');
})

router.post('/mya-001/decision-view', function (req, res) {

	if (req.body['radio-group'] === 'accept the decision') {
		res.redirect('/mya-001/decision-view-confirm')
	} else if (req.body['radio-group'] === 'want a hearing') {
		res.redirect('/mya-001/hearing-confirm')
	}

})


// Confirm accept view

router.get('/mya-001/decision-view-confirm', function (req, res) {
	console.log(req.query);
	res.render('mya-001/decision-view-confirm');
})

router.post('/mya-001/decision-view-confirm', function (req, res) {

	if (req.body['radio-group'] === 'confirm accept the view') {
		res.redirect('/mya-001/decision-view-accepted')
	} else if (req.body['radio-group'] === 'back to view') {
		res.redirect('/mya-001/decision-view')
	}

})


// Decision now or hearing

router.get('/mya-001/decision-or-hearing', function (req, res) {
	console.log(req.query);
	res.render('mya-001/decision-or-hearing');
})

router.post('/mya-001/decision-or-hearing', function (req, res) {

	if (req.body['radio-group'] === 'decision') {
		res.redirect('/mya-001/decision-final')
	} else if (req.body['radio-group'] === 'hearing') {
		res.redirect('/mya-001/hearing-requirements-start')
	}

})



// Decision view confirm

router.get('/mya-001/decision-view-confirm', function (req, res) {
	console.log(req.query);
	res.render('mya-001/decision-view-confirm');
})

router.post('/mya-001/decision-view-confirm', function (req, res) {

	if (req.body['radio-group'] === 'confirm accept the view') {
		res.redirect('/mya-001/decision-view-accepted')
	} else if (req.body['radio-group'] === 'back to view') {
		res.redirect('/mya-001/decision-view')
	}

})



// Hearing confirm

router.get('/mya-001/hearing-confirm', function (req, res) {
	console.log(req.query);
	res.render('mya-001/hearing-confirm');
})

router.post('/mya-001/hearing-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/mya-001/hearing-explain-why')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/mya-001/decision-view')
	}
	
})



// Hearing required

router.get('/mya-001/hearing-required', function (req, res) {
	console.log(req.query);
	res.render('mya-001/hearing-required');
})

router.post('/mya-001/hearing-required', function (req, res) {

	if (req.body['radio-group'] === 'Yes I want a hearing') {
		res.redirect('/mya-001/hearing-requirements-start')
	} else if (req.body['radio-group'] === 'No I don’t want a hearing') {
		res.redirect('/mya-001/hearing-telephone')
	}

})





// Telephone hearing

router.get('/mya-001/hearing-telephone', function (req, res) {
	console.log(req.query);
	res.render('mya-001/hearing-telephone');
})

router.post('/mya-001/hearing-telephone', function (req, res) {

	if (req.body['radio-group'] === 'yes telephone hearing') {
		res.redirect('/mya-001/hearing-telephone-yes')
	} else if (req.body['radio-group'] === 'no telephone hearing') {
		res.redirect('/mya-001/hearing-telephone-no')
	}

})

// add your routes here

module.exports = router





// Change hearing location

router.get('/mya-001/hearing-location-change-sure', function (req, res) {
	console.log(req.query);
	res.render('mya-001/hearing-location-change-sure');
})

router.post('/mya-001/hearing-location-change-sure', function (req, res) {

	if (req.body['radio-group'] === 'locationchange') {
		res.redirect('/mya-001/hearing-location-change-reasons')
	} else if (req.body['radio-group'] === 'locationkeep') {
		res.redirect('/mya-001/appeal-hearing')
	}

})
