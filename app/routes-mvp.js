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

router.get('/mvp/evidence-options', function (req, res) {
	console.log(req.query);
	res.render('/mvp/evidence-options');
})

router.post('/mvp/evidence-options', function (req, res) {

	if (req.body['radio-group'] === 'Post it') {
		res.redirect('/mvp/evidence-post')
	} else if (req.body['radio-group'] === 'Upload it') {
		res.redirect('/mvp/evidence-upload')
	} else {
		res.redirect('/mvp/evidence-statement')
	}

})

router.get('/mvp/task-list', function (req, res) {
    res.render('mvp/task-list');
});

// Question - Walking

router.get('/mvp/question-walking', function (req, res) {
	res.render('mvp/question-walking');
})

router.post('/mvp/question-walking', function (req, res) {
	res.redirect('/mvp/task-list?walkingCompletedOrDraft=draft');
});

// Question - interacting

router.get('/mvp/question-interacting-files', function (req, res) {
    console.log('get files');
    var files = req.session.data.interactingFileUploads || [];
    res.send(files);
});

router.post('/mvp/delete-question-interacting-files', function (req, res) {
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

router.get('/mvp/question-interacting', function (req, res) {
	res.render('mvp/question-interacting');
})

router.post('/mvp/question-interacting', function (req, res) {
	res.redirect('/mvp/task-list?interactingCompletedOrDraft=draft');
});

router.post('/mvp/evidence-upload-interact', upload.single('fileUpload'), function (req, res) {
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

router.get('/mvp/question-migraine', function (req, res) {
	res.render('mvp/question-migraine');
})

router.post('/mvp/question-migraine', function (req, res) {
	res.redirect('/mvp/task-list-extend?migraineCompletedOrDraft=draft');
});



// Question - DWP response

router.get('/mvp/question-dwp-response', function (req, res) {
	res.render('mvp/question-dwp-response');
})

router.post('/mvp/question-dwp-response', function (req, res) {
	res.redirect('/mvp/task-list-extend?dwpresponseCompletedOrDraft=draft');
});


// Question - Mobility - Round 2

router.get('/mvp/question-mobility', function (req, res) {
	res.render('mvp/question-mobility');
})

router.post('/mvp/question-mobility', function (req, res) {
	res.redirect('/mvp/task-list-r2?mobilityCompletedOrDraft=draft');
});




// Question - Medical records

router.get('/mvp/question-medical-records', function (req, res) {
	console.log(req.query);
	res.render('mvp/question-medical-records');
})

router.post('/mvp/question-medical-records', function (req, res) {

	if (req.body['radio-group'] === 'Yes I give permission') {
		res.redirect('/mvp/medical-records-yes')
	} else if (req.body['radio-group'] === 'No I don’t give permission') {
		res.redirect('/mvp/medical-records-no')
	}

})


// Question - Medical records - Round 2

router.get('/medical-records-yes', function (req, res) {
	res.render('mvp/medical-records-yes');
})

router.post('/mvp/medical-records-yes', function (req, res) {
	res.redirect('/mvp/task-list-r2?medicalCompletedOrDraft=draft');
});


router.get('/mvp/evidence-upload-interact', function (req, res) {
	res.render('mvp/evidence-upload-interact');
});

router.get('/mvp/question-interacting-upload', function (req, res) {
    res.render('mvp/question-interacting-upload');
});

// Extend a deadline

router.get('/mvp/extend-are-sure', function (req, res) {
	console.log(req.query);
	console.log('MVP');
	res.render('mvp/extend-are-sure');
})

router.post('/mvp/extend-are-sure', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mvp/extend-confirm')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mvp/extend-no')
	}  else if (req.body['radio-group'] === 'Longer') {
		res.redirect('/mvp/extend-longer')
}
})


// Extend a deadline2

router.get('/mvp/extend-are-sure2', function (req, res) {
	console.log(req.query);
	res.render('mvp/extend-are-sure2');
})

router.post('/mvp/extend-are-sure2', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mvp/extend-rejected')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mvp/extend-no')
}
})


// Extend a deadline3

router.get('/mvp/extend-are-sure3', function (req, res) {
	console.log(req.query);
	res.render('mvp/extend-are-sure3');
})

router.post('/mvp/extend-are-sure3', function (req, res) {

	if (req.body['radio-group'] === 'Yes') {
		res.redirect('/mvp/extend-longer3')
	} else if (req.body['radio-group'] === 'No') {
		res.redirect('/mvp/extend-no')
}
})



// Decision accept or hearing

router.get('/mvp/decision-view', function (req, res) {
	console.log(req.query);
	res.render('mvp/decision-view');
})

router.post('/mvp/decision-view', function (req, res) {

	if (req.body['radio-group'] === 'accept the decision') {
		res.redirect('/mvp/decision-view-accepted')
	} else if (req.body['radio-group'] === 'want a hearing') {
		res.redirect('/mvp/hearing-confirm')
	}

})



// Decision now or hearing

router.get('/mvp/decision-or-hearing', function (req, res) {
	console.log(req.query);
	res.render('mvp/decision-or-hearing');
})

router.post('/mvp/decision-or-hearing', function (req, res) {

	if (req.body['radio-group'] === 'decision') {
		res.redirect('/mvp/decision-final')
	} else if (req.body['radio-group'] === 'hearing') {
		res.redirect('/mvp/hearing-requirements-start')
	}

})



// Decision now confirm

router.get('/mvp/decision-now-confirm', function (req, res) {
	console.log(req.query);
	res.render('mvp/decision-now-confirm');
})

router.post('/mvp/decision-now-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/mvp/decision-final')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/mvp/decision-or-hearing')
	}

})



// Hearing confirm

router.get('/mvp/hearing-confirm', function (req, res) {
	console.log(req.query);
	res.render('mvp/hearing-confirm');
})

router.post('/mvp/hearing-confirm', function (req, res) {

	if (req.body['radio-group'] === 'yes') {
		res.redirect('/hearing-explain-why')
	} else if (req.body['radio-group'] === 'no') {
		res.redirect('/mvp/decision-view')
	}
	
})



// Hearing required

router.get('/mvp/hearing-required', function (req, res) {
	console.log(req.query);
	res.render('mvp/hearing-required');
})

router.post('/mvp/hearing-required', function (req, res) {

	if (req.body['radio-group'] === 'Yes I want a hearing') {
		res.redirect('/mvp/hearing-requirements-start')
	} else if (req.body['radio-group'] === 'No I don’t want a hearing') {
		res.redirect('/mvp/hearing-telephone')
	}

})





// Telephone hearing

router.get('/mvp/hearing-telephone', function (req, res) {
	console.log(req.query);
	res.render('mvp/hearing-telephone');
})

router.post('/mvp/hearing-telephone', function (req, res) {

	if (req.body['radio-group'] === 'yes telephone hearing') {
		res.redirect('/mvp/hearing-telephone-yes')
	} else if (req.body['radio-group'] === 'no telephone hearing') {
		res.redirect('/mvp/hearing-telephone-no')
	}

})

// add your routes here

module.exports = router
