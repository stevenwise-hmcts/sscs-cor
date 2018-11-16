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

router.get('/s1pi12/evidence-options', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/evidence-options');
})

router.post('/s1pi12/evidence-options', function (req, res) {

	if (req.body['radio-group'] === 'Post it') {
		res.redirect('/s1pi12/evidence-post')
	} else if (req.body['radio-group'] === 'Upload it') {
		res.redirect('/s1pi12/evidence-upload')
	} else {
		res.redirect('/s1pi12/evidence-statement')
	}

})

router.get('/task-list', function (req, res) {
    res.render('task-list');
});



// Question - DWP response

router.get('/s1pi12/question-dwp-response', function (req, res) {
	res.render('s1pi12/question-dwp-response');
})

router.post('/s1pi12/question-dwp-response', function (req, res) {
	res.redirect('/s1pi12/appeal-dwp-response?dwpresponseCompletedOrDraft=draft');
});



// Question - Walking

router.get('/s1pi12/question-walking', function (req, res) {
	res.render('mvp/question-walking');
})

router.post('/s1pi12/question-walking', function (req, res) {
	res.redirect('/s1pi12/task-list?walkingCompletedOrDraft=draft');
});

// Question - journey

router.get('/s1pi12/question-journey-files', function (req, res) {
    console.log('get files');
    var files = req.session.data.journeyFileUploads || [];
    res.send(files);
});

router.post('/s1pi12/delete-question-journey-files', function (req, res) {
    console.log('delete file');
	var fileName = req.body.name || req.body.originalname;
    var fileList = req.session.data.journeyFileUploads;

    fileList.forEach(file => {
		if (file.originalname === fileName) {
			_.pull(fileList, file);
		}
    });

    req.session.data.journeyFileUploads = fileList;

    res.status(200).send(fileList);
});

router.get('/s1pi12/question-journey', function (req, res) {
	res.render('mvp/question-journey');
})

router.post('/s1pi12/question-journey', function (req, res) {
	res.redirect('/s1pi12/task-list?journeyCompletedOrDraft=draft');
});

router.post('/s1pi12/evidence-upload-interact', upload.single('fileUpload'), function (req, res) {
    console.log('add file');
	// Add file data to session
    if (req.session.data.journeyFileUploads) {
        req.session.data.journeyFileUploads.push(req.file)
    } else {
        req.session.data.journeyFileUploads = [req.file];
    }

    console.log(req.session.data.journeyFileUploads);

    res.send(req.file);
});


// Question - factory

router.get('/s1pi12/question-factory', function (req, res) {
	res.render('mvp/question-factory');
})

router.post('/s1pi12/question-factory', function (req, res) {
	res.redirect('/s1pi12/task-list-extend?factoryCompletedOrDraft=draft');
});



// Question - Migraine

router.get('/s1pi12/question-migraine', function (req, res) {
	res.render('s1pi12/question-migraine');
})

router.post('/s1pi12/question-migraine', function (req, res) {
	res.redirect('/s1pi12/appeal-q1-extend?migraineCompletedOrDraft=draft');
});


// Question - Mobility - Round 2

router.get('/s1pi12/question-mobility', function (req, res) {
	res.render('s1pi12/question-mobility');
})

router.post('/s1pi12/question-mobility', function (req, res) {
	res.redirect('/s1pi12/appeal-q2?mobilityCompletedOrDraft=draft');
});




// Question - Medical records

router.get('/s1pi12/question-medical-records', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/question-medical-records');
})

router.post('/s1pi12/question-medical-records', function (req, res) {

	if (req.body['radio-group'] === 'Yes I give permission') {
		res.redirect('/s1pi12/medical-records-yes')
	} else if (req.body['radio-group'] === 'No I don’t give permission') {
		res.redirect('/s1pi12/medical-records-no')
	}

})


// Question - Medical records - Round 2

router.get('/s1pi12/medical-records-yes', function (req, res) {
	res.render('s1pi12/medical-records-yes');
})

router.post('/s1pi12/medical-records-yes', function (req, res) {
	res.redirect('s1pi12/task-list-r2?medicalCompletedOrDraft=draft');
});


router.get('/s1pi12/evidence-upload-interact', function (req, res) {
	res.render('s1pi12/evidence-upload-interact');
});

router.get('/s1pi12/question-interacting-upload', function (req, res) {
    res.render('s1pi12/question-interacting-upload');
});

// Extend a deadline

router.get('/s1pi12/extend-are-sure', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/extend-are-sure');
})

router.post('/s1pi12/extend-are-sure', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/s1pi12/extend-confirm')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/s1pi12/extend-no')
	}  else if (req.body['radio-group'] === 'Longer') {
		res.redirect('/s1pi12/extend-longer')
}
})


// Extend a deadline2

router.get('/s1pi12/extend-are-sure2', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/extend-are-sure2');
})

router.post('/s1pi12/extend-are-sure2', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/s1pi12/extend-rejected')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/s1pi12/extend-no')
}
})


// Extend a deadline3

router.get('/s1pi12/extend-are-sure3', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/extend-are-sure3');
})

router.post('/s1pi12/extend-are-sure3', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/s1pi12/extend-longer2')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/s1pi12/extend-no')
}
})



// Decision accept or hearing

router.get('/s1pi12/decision-view', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/decision-view');
})

router.post('/s1pi12/decision-view', function (req, res) {

	if (req.body['radio-group'] === 'accept the decision') {
		res.redirect('/s1pi12/decision-view-confirm')
	} else if (req.body['radio-group'] === 'want a hearing') {
		res.redirect('/s1pi12/hearing-confirm')
	}

})


// Confirm accept view

router.get('/s1pi12/decision-view-confirm', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/decision-view-confirm');
})

router.post('/s1pi12/decision-view', function (req, res) {

	if (req.body['radio-group'] === 'confirm accept the view') {
		res.redirect('/s1pi12/decision-view-accepted')
	} else if (req.body['radio-group'] === 'back to view') {
		res.redirect('/s1pi12/decision-view')
	}

})


// Decision now or hearing

router.get('/s1pi12/decision-or-hearing', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/decision-or-hearing');
})

router.post('/s1pi12/decision-or-hearing', function (req, res) {

	if (req.body['radio-group'] === 'decision') {
		res.redirect('/s1pi12/decision-final')
	} else if (req.body['radio-group'] === 'hearing') {
		res.redirect('/s1pi12/hearing-requirements-start')
	}

})



// Decision view confirm

router.get('/s1pi12/decision-view-confirm', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/decision-view-confirm');
})

router.post('/s1pi12/decision-view-confirm', function (req, res) {

	if (req.body['radio-group'] === 'confirm accept the view') {
		res.redirect('/s1pi12/decision-view-accepted')
	} else if (req.body['radio-group'] === 'back to view') {
		res.redirect('/s1pi12/decision-view')
	}

})



// Hearing confirm

router.get('/s1pi12/hearing-confirm', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/hearing-confirm');
})

router.post('/s1pi12/hearing-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/s1pi12/hearing-explain-why')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/s1pi12/decision-view')
	}
	
})



// Hearing required

router.get('/s1pi12/hearing-required', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/hearing-required');
})

router.post('/s1pi12/hearing-required', function (req, res) {

	if (req.body['radio-group'] === 'Yes I want a hearing') {
		res.redirect('/s1pi12/hearing-requirements-start')
	} else if (req.body['radio-group'] === 'No I don’t want a hearing') {
		res.redirect('/s1pi12/hearing-telephone')
	}

})





// Telephone hearing

router.get('/s1pi12/hearing-telephone', function (req, res) {
	console.log(req.query);
	res.render('s1pi12/hearing-telephone');
})

router.post('/s1pi12/hearing-telephone', function (req, res) {

	if (req.body['radio-group'] === 'yes telephone hearing') {
		res.redirect('/s1pi12/hearing-telephone-yes')
	} else if (req.body['radio-group'] === 'no telephone hearing') {
		res.redirect('/s1pi12/hearing-telephone-no')
	}

})

// add your routes here

module.exports = router
