var express = require('express'),
    router = express.Router(),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

router.get('/', function (req, res) {
    res.render('submission-form', {message: '', errors: {} });
});


router.post('/', function (req, res) {
    req.assert('email', 'A valid email address').isEmail();
    var errors = req.validationErrors();
    //Nodemailer setup
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        debug: true,
        auth: { 
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }));
    console.log('smtp configured');
    //Mail Options
    var mailOpts = {
        to: process.env.SMTP_USER,
        subject: 'Suggestions',
        text: 'email: ' + req.body.email + '\n' + '\n'+ 'Suggestion: ' + req.body.suggestion
    };
    
    if(!errors) {
        transporter.sendMail(mailOpts, function (error, info){
            if(error) {
                console.log(error);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
            transporter.close();
            res.render('submission-form', {
                title: 'title', 
                scripts: ['javascript/app.js'],
                message: 'Message sent, Thanks!', 
                errors: {}
            });
        });
    }
    else {
        res.render('submission-form',
                  {title: 'title',
                  message: '',
                  scripts: ['javascript/app.js'],
                  errors: errors});
    }
});

module.exports = router;
