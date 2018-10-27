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

router.get('/s6pi11/evidence-options', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/evidence-options');
})

router.post('/s6pi11/evidence-options', function (req, res) {

	if (req.body['radio-group'] === 'Post it') {
		res.redirect('/s6pi11/evidence-post')
	} else if (req.body['radio-group'] === 'Upload it') {
		res.redirect('/s6pi11/evidence-upload')
	} else {
		res.redirect('/s6pi11/evidence-statement')
	}

})

router.get('/task-list', function (req, res) {
    res.render('task-list');
});



// Question - DWP response

router.get('/s6pi11/question-dwp-response', function (req, res) {
	res.render('s6pi11/question-dwp-response');
})

router.post('/s6pi11/question-dwp-response', function (req, res) {
	res.redirect('/s6pi11/appeal-dwp-response?dwpresponseCompletedOrDraft=draft');
});



// Question - Walking

router.get('/s6pi11/question-walking', function (req, res) {
	res.render('s6pi11/question-walking');
})

router.post('/s6pi11/question-walking', function (req, res) {
	res.redirect('/s6pi11/appeal-q1?walkingCompletedOrDraft=draft');
});

// Question - interacting

router.get('/s6pi11/question-interacting-files', function (req, res) {
    console.log('get files');
    var files = req.session.data.interactingFileUploads || [];
    res.send(files);
});

router.post('/s6pi11/delete-question-interacting-files', function (req, res) {
    console.log('delete file');
	var fileName = req.body.name || req.body.originalname;
    var fileList = req.session.data.interactingFileUploads;

    fileList.forEach(file => {
		if (file.originalname === fileName) {
			_.pull(fileList, file);
		}
    });

    req.session.data.interactingFileUploads = fileList;

    res.status(200).send(fileList);
});

router.get('/s6pi11/question-interacting', function (req, res) {
	res.render('s6pi11/question-interacting');
})

router.post('/s6pi11/question-interacting', function (req, res) {
	res.redirect('/s6pi11/appeal-q1?interactingCompletedOrDraft=draft');
});

router.post('/s6pi11/evidence-upload-interact', upload.single('fileUpload'), function (req, res) {
    console.log('add file');
	// Add file data to session
    if (req.session.data.interactingFileUploads) {
        req.session.data.interactingFileUploads.push(req.file)
    } else {
        req.session.data.interactingFileUploads = [req.file];
    }

    console.log(req.session.data.interactingFileUploads);

    res.send(req.file);
});


// Question - Migraine

router.get('/s6pi11/question-migraine', function (req, res) {
	res.render('question-migraine');
})

router.post('/s6pi11/question-migraine', function (req, res) {
	res.redirect('/s6pi11/appeal-q1-extend?migraineCompletedOrDraft=draft');
});


// Question - Mobility - Round 2

router.get('/s6pi11/question-mobility', function (req, res) {
	res.render('s6pi11/question-mobility');
})

router.post('/s6pi11/question-mobility', function (req, res) {
	res.redirect('/s6pi11/appeal-q2?mobilityCompletedOrDraft=draft');
});




// Question - Medical records

router.get('/s6pi11/question-medical-records', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/question-medical-records');
})

router.post('/s6pi11/question-medical-records', function (req, res) {

	if (req.body['radio-group'] === 'Yes I give permission') {
		res.redirect('/s6pi11/medical-records-yes')
	} else if (req.body['radio-group'] === 'No I don’t give permission') {
		res.redirect('/s6pi11/medical-records-no')
	}

})


// Question - Medical records - Round 2

router.get('/s6pi11/medical-records-yes', function (req, res) {
	res.render('s6pi11/medical-records-yes');
})

router.post('/s6pi11/medical-records-yes', function (req, res) {
	res.redirect('s6pi11/task-list-r2?medicalCompletedOrDraft=draft');
});


router.get('/s6pi11/evidence-upload-interact', function (req, res) {
	res.render('s6pi11/evidence-upload-interact');
});

router.get('/s6pi11/question-interacting-upload', function (req, res) {
    res.render('s6pi11/question-interacting-upload');
});

// Extend a deadline

router.get('/s6pi11/extend-are-sure', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/extend-are-sure');
})

router.post('/s6pi11/extend-are-sure', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/s6pi11/extend-confirm')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/s6pi11/extend-no')
	}  else if (req.body['radio-group'] === 'Longer') {
		res.redirect('/s6pi11/extend-longer')
}
})


// Extend a deadline2

router.get('/s6pi11/extend-are-sure2', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/extend-are-sure2');
})

router.post('/s6pi11/extend-are-sure2', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/s6pi11/extend-rejected')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/s6pi11/extend-no')
}
})


// Extend a deadline3

router.get('/s6pi11/extend-are-sure3', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/extend-are-sure3');
})

router.post('/s6pi11/extend-are-sure3', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/s6pi11/extend-longer2')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/s6pi11/extend-no')
}
})



// Decision accept or hearing

router.get('/s6pi11/decision-view', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/decision-view');
})

router.post('/s6pi11/decision-view', function (req, res) {

	if (req.body['radio-group'] === 'accept the decision') {
		res.redirect('/s6pi11/decision-view-accepted')
	} else if (req.body['radio-group'] === 'want a hearing') {
		res.redirect('/s6pi11/hearing-confirm')
	}

})



// Decision now or hearing

router.get('/s6pi11/decision-or-hearing', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/decision-or-hearing');
})

router.post('/s6pi11/decision-or-hearing', function (req, res) {

	if (req.body['radio-group'] === 'decision') {
		res.redirect('/s6pi11/decision-final')
	} else if (req.body['radio-group'] === 'hearing') {
		res.redirect('/s6pi11/hearing-requirements-start')
	}

})



// Decision now confirm

router.get('/s6pi11/decision-now-confirm', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/decision-now-confirm');
})

router.post('/s6pi11/decision-now-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/s6pi11/decision-final')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/s6pi11/decision-or-hearing')
	}

})



// Hearing confirm

router.get('/s6pi11/hearing-confirm', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/hearing-confirm');
})

router.post('/s6pi11/hearing-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/s6pi11/hearing-explain-why')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/s6pi11/decision-view')
	}
	
})



// Hearing required

router.get('/s6pi11/hearing-required', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/hearing-required');
})

router.post('/s6pi11/hearing-required', function (req, res) {

	if (req.body['radio-group'] === 'Yes I want a hearing') {
		res.redirect('/s6pi11/hearing-requirements-start')
	} else if (req.body['radio-group'] === 'No I don’t want a hearing') {
		res.redirect('/s6pi11/hearing-telephone')
	}

})





// Telephone hearing

router.get('/s6pi11/hearing-telephone', function (req, res) {
	console.log(req.query);
	res.render('s6pi11/hearing-telephone');
})

router.post('/s6pi11/hearing-telephone', function (req, res) {

	if (req.body['radio-group'] === 'yes telephone hearing') {
		res.redirect('/s6pi11/hearing-telephone-yes')
	} else if (req.body['radio-group'] === 'no telephone hearing') {
		res.redirect('/s6pi11/hearing-telephone-no')
	}

})

// add your routes here

module.exports = router
