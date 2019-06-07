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

router.get('/mya-mvp/evidence-options', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/evidence-options');
})

router.post('/mya-mvp/evidence-options', function (req, res) {

	if (req.body['radio-group'] === 'Post it') {
		res.redirect('/mya-mvp/evidence-post')
	} else if (req.body['radio-group'] === 'Upload it') {
		res.redirect('/mya-mvp/evidence-upload')
	} else {
		res.redirect('/mya-mvp/evidence-statement')
	}

})

// Change hearing type 

router.get('/mya-mvp/hearing-type-change-sure', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-type-change-sure');
})

router.post('/mya-mvp/hearing-type-change-sure', function (req, res) {

	if (req.body['radio-group'] === 'stillattend') {
		res.redirect('/mya-mvp/appeal-hearing')
	} else if (req.body['radio-group'] === 'notattend') {
		res.redirect('/mya-mvp/hearing-type-change-confirm')
	} 

})

router.get('/appeal-q1', function (req, res) {
    res.render('appeal-q1');
});


// Change hearing location

router.get('/mya-mvp/hearing-change', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-change');
})

router.post('/mya-mvp/hearing-change', function (req, res) {

	if (req.body['radio-group'] === 'yeschangevenue') {
		res.redirect('/mya-mvp/hearing-venue-updated')
	} else if (req.body['radio-group'] === 'nochangevenue') {
		res.redirect('/mya-mvp/your-details-address')
	} 

})

// Change hearing location request

router.get('/mya-mvp/hearing-change-request', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-change-request');
})

router.post('/mya-mvp/hearing-change-request', function (req, res) {

	if (req.body['radio-group'] === 'yeschangevenuerequest') {
		res.redirect('/mya-mvp/hearing-venue-updated')
	} else if (req.body['radio-group'] === 'nochangevenuerequest') {
		res.redirect('/mya-mvp/your-details-address')
	} 

})

// Change hearing location why

router.get('/mya-mvp/hearing-location-change-why', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-location-change-why');
})

router.post('/mya-mvp/hearing-location-change-why', function (req, res) {

	if (req.body['radio-group'] === 'newarea') {
		res.redirect('/mya-mvp/your-address-venue-change')
	} else if (req.body['radio-group'] === 'notnewarea') {
		res.redirect('/mya-mvp/hearing-location-change-reasons')
	} 

})

router.get('/appeal-q1', function (req, res) {
    res.render('appeal-q1');
});

// Withdraw

router.get('/mya-mvp/withdraw-appeal-sure', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/withdraw-appeal-sure');
})

router.post('/mya-mvp/withdraw-appeal-sure', function (req, res) {

	if (req.body['radio-group'] === 'yeswithdraw') {
		res.redirect('/mya-mvp/withdraw-reasons')
	} else if (req.body['radio-group'] === 'nowithdraw') {
		res.redirect('/mya-mvp/service-guide#withdraw')
	} 

})

router.get('/appeal-q1', function (req, res) {
    res.render('appeal-q1');
});



// Question - DWP response

router.get('/mya-mvp/question-dwp-response', function (req, res) {
	res.render('mya-mvp/question-dwp-response');
})

router.post('/mya-mvp/question-dwp-response', function (req, res) {
	res.redirect('/mya-mvp/appeal-dwp-response?dwpresponseCompletedOrDraft=draft');
});



// Question - Walking

router.get('/mya-mvp/question-walking', function (req, res) {
	res.render('mya-mvp/question-walking');
})

router.post('/mya-mvp/question-walking', function (req, res) {
	res.redirect('/mya-mvp/appeal-manage-questions-r1?walkingCompletedOrDraft=draft#questions');
});


// Question - cooking

router.get('/mya-mvp/question-cooking', function (req, res) {
	res.render('mya-mvp/question-cooking');
})

router.post('/mya-mvp/question-cooking', function (req, res) {
	res.redirect('/mya-mvp/appeal-manage-questions-r1?cookingCompletedOrDraft=draft#questions');
});






// Question - factory

router.get('/mya-mvp/question-factory', function (req, res) {
	res.render('mya-mvp/question-factory');
})

router.post('/mya-mvp/question-factory', function (req, res) {
	res.redirect('/mya-mvp/appeal-manage-questions-r1?factoryCompletedOrDraft=draft#questions');
});



// Question - Migraine

router.get('/mya-mvp/question-migraine', function (req, res) {
	res.render('mya-mvp/question-migraine');
})

router.post('/mya-mvp/question-migraine', function (req, res) {
	res.redirect('/mya-mvp/appeal-q1-extend?migraineCompletedOrDraft=draft');
});


// Question - Mobility - Round 2

router.get('/mya-mvp/question-mobility', function (req, res) {
	res.render('mya-mvp/question-mobility');
})

router.post('/mya-mvp/question-mobility', function (req, res) {
	res.redirect('/mya-mvp/appeal-q2?mobilityCompletedOrDraft=draft');
});




// Question - Medical records

router.get('/mya-mvp/question-medical-records', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/question-medical-records');
})

router.post('/mya-mvp/question-medical-records', function (req, res) {

	if (req.body['radio-group'] === 'Yes I give permission') {
		res.redirect('/mya-mvp/medical-records-yes')
	} else if (req.body['radio-group'] === 'No I don’t give permission') {
		res.redirect('/mya-mvp/medical-records-no')
	}

})


// Question - Medical records - Round 2

router.get('/mya-mvp/medical-records-yes', function (req, res) {
	res.render('mya-mvp/medical-records-yes');
})

router.post('/mya-mvp/medical-records-yes', function (req, res) {
	res.redirect('mya-mvp/appeal-q1-r2?medicalCompletedOrDraft=draft');
});


router.get('/mya-mvp/evidence-upload-interact', function (req, res) {
	res.render('mya-mvp/evidence-upload-interact');
});

router.get('/mya-mvp/question-interacting-upload', function (req, res) {
    res.render('mya-mvp/question-interacting-upload');
});

// Extend a deadline

router.get('/mya-mvp/extend-are-sure', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/extend-are-sure');
})

router.post('/mya-mvp/extend-are-sure', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mya-mvp/extend-confirm')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mya-mvp/extend-no')
	}  else if (req.body['radio-group'] === 'Longer') {
		res.redirect('/mya-mvp/extend-longer')
}
})


// Extend a deadline2

router.get('/mya-mvp/extend-are-sure2', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/extend-are-sure2');
})

router.post('/mya-mvp/extend-are-sure2', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mya-mvp/extend-rejected')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mya-mvp/extend-no')
}
})


// Extend a deadline3

router.get('/mya-mvp/extend-are-sure3', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/extend-are-sure3');
})

router.post('/mya-mvp/extend-are-sure3', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mya-mvp/extend-longer2')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mya-mvp/extend-no')
}
})



// Decision accept or hearing

router.get('/mya-mvp/decision-view', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/decision-view');
})

router.post('/mya-mvp/decision-view', function (req, res) {

	if (req.body['radio-group'] === 'accept the decision') {
		res.redirect('/mya-mvp/decision-view-confirm')
	} else if (req.body['radio-group'] === 'want a hearing') {
		res.redirect('/mya-mvp/hearing-confirm')
	}

})


// Confirm accept view

router.get('/mya-mvp/decision-view-confirm', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/decision-view-confirm');
})

router.post('/mya-mvp/decision-view-confirm', function (req, res) {

	if (req.body['radio-group'] === 'confirm accept the view') {
		res.redirect('/mya-mvp/decision-view-accepted')
	} else if (req.body['radio-group'] === 'back to view') {
		res.redirect('/mya-mvp/decision-view')
	}

})


// Decision now or hearing

router.get('/mya-mvp/decision-or-hearing', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/decision-or-hearing');
})

router.post('/mya-mvp/decision-or-hearing', function (req, res) {

	if (req.body['radio-group'] === 'decision') {
		res.redirect('/mya-mvp/decision-final')
	} else if (req.body['radio-group'] === 'hearing') {
		res.redirect('/mya-mvp/hearing-requirements-start')
	}

})



// Decision view confirm

router.get('/mya-mvp/decision-view-confirm', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/decision-view-confirm');
})

router.post('/mya-mvp/decision-view-confirm', function (req, res) {

	if (req.body['radio-group'] === 'confirm accept the view') {
		res.redirect('/mya-mvp/decision-view-accepted')
	} else if (req.body['radio-group'] === 'back to view') {
		res.redirect('/mya-mvp/decision-view')
	}

})



// Hearing confirm

router.get('/mya-mvp/hearing-confirm', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-confirm');
})

router.post('/mya-mvp/hearing-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/mya-mvp/hearing-explain-why')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/mya-mvp/decision-view')
	}
	
})



// Hearing required

router.get('/mya-mvp/hearing-required', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-required');
})

router.post('/mya-mvp/hearing-required', function (req, res) {

	if (req.body['radio-group'] === 'Yes I want a hearing') {
		res.redirect('/mya-mvp/hearing-requirements-start')
	} else if (req.body['radio-group'] === 'No I don’t want a hearing') {
		res.redirect('/mya-mvp/hearing-telephone')
	}

})





// Telephone hearing

router.get('/mya-mvp/hearing-telephone', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-telephone');
})

router.post('/mya-mvp/hearing-telephone', function (req, res) {

	if (req.body['radio-group'] === 'yes telephone hearing') {
		res.redirect('/mya-mvp/hearing-telephone-yes')
	} else if (req.body['radio-group'] === 'no telephone hearing') {
		res.redirect('/mya-mvp/hearing-telephone-no')
	}

})

// add your routes here

module.exports = router





// Change hearing location

router.get('/mya-mvp/hearing-location-change-sure', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-location-change-sure');
})

router.post('/mya-mvp/hearing-location-change-sure', function (req, res) {

	if (req.body['radio-group'] === 'locationchange') {
		res.redirect('/mya-mvp/hearing-location-change-reasons')
	} else if (req.body['radio-group'] === 'locationkeep') {
		res.redirect('/mya-mvp/appeal-hearing')
	}

})


// Change hearing date change

router.get('/mya-mvp/hearing-date-change-sure', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/hearing-date-change-sure');
})

router.post('/mya-mvp/hearing-date-change-sure', function (req, res) {

	if (req.body['radio-group'] === 'datekeep') {
		res.redirect('/mya-mvp/appeal-hearing')
	} else if (req.body['radio-group'] === 'datechange') {
		res.redirect('/mya-mvp/hearing-date-change-reasons')
	} 

})

// Update text message number

router.get('/mya-mvp/your-text-messsage-updates-new-number', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/your-text-messsage-updates-new-number');
})

router.post('/mya-mvp/your-text-messsage-updates-new-number', function (req, res) {

	if (req.body['radio-group'] === 'yesnewnumber') {
		res.redirect('/mya-mvp/your-details-text-message-updates')
	} else if (req.body['radio-group'] === 'nonewnumber') {
		res.redirect('/mya-mvp/your-details-update-text-number-no')
	} 

})


// Update contact number number

router.get('/mya-mvp/your-contact-phone-new', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/your-contact-phone-new');
})

router.post('/mya-mvp/your-contact-phone-new', function (req, res) {

	if (req.body['radio-group'] === 'yescontactnew') {
		res.redirect('/mya-mvp/your-details-contact-phone-text-yes')
	} else if (req.body['radio-group'] === 'nocontactnew') {
		res.redirect('/mya-mvp/your-details-contact-phone-text-no')
	} 

})



// Sign up rep to texts

router.get('/mya-mvp/your-rep-text-message-sign-up', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/your-rep-text-message-sign-up');
})

router.post('/mya-mvp/your-rep-text-message-sign-up', function (req, res) {

	if (req.body['radio-group'] === 'yessignuprep') {
		res.redirect('/mya-mvp/your-rep-text-same-number')
	} else if (req.body['radio-group'] === 'nosignuprep') {
		res.redirect('/mya-mvp/your-representative-text-message-updates-no')
	} 

})

// Sign up rep to texts

router.get('/mya-mvp/your-rep-text-same-number', function (req, res) {
	console.log(req.query);
	res.render('mya-mvp/your-rep-text-same-number');
})

router.post('/mya-mvp/your-rep-text-same-number', function (req, res) {

	if (req.body['radio-group'] === 'yessamenumber') {
		res.redirect('/mya-mvp/your-representative-text-message-updates')
	} else if (req.body['radio-group'] === 'nosamenumber') {
		res.redirect('/mya-mvp/your-rep-text-number')
	} 

})