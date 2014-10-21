var express = require('express'),
    router = express.Router(),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

router.get('/', function (req, res) {
    res.render('landing', {message: '', errors: {} });
});


router.post('/feedback', function (req, res) {
    req.assert('email', 'A valid email address is required').isEmail();
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
        console.log('No errors here my friend');
        transporter.sendMail(mailOpts, function (error, info){
            if(error) {
                console.log(error);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
            transporter.close();
            res.render('landing', {
                title: 'title', 
                message: 'Message Sent', 
                errors: {}
            });
        });
    }
    else {
        console.log("ERROR ERROR 3000");
        res.render('landing',
                  {title: 'title',
                  message: '',
                  errors: errors});
    }
});

module.exports = router;
