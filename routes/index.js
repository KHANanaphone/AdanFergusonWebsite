var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */

router.get('/*', function(req, res) {

    var url = req.url.substring(1);

    if(!url)
        url = '';

    var pages = {
        '': {name: 'Home', view: 'home'},
        about: {name: 'About Me', view: 'about'},
        mywork: {name: 'My Work', view: 'mywork'},
        contact: {name: 'Contact', view: 'contact'},
    };

    var currentPage = pages[url];

    if(!currentPage)
        return res.redirect('/');

    res.render(currentPage.view, {
        title: 'Adam Ferguson',
        pages: pages,
        currentPage: currentPage.view
    });
});

router.post('/contact', function(req, res){

    //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
    var smtpTrans = nodemailer.createTransport('smtps://adanferguson%40gmail.com:zvheahcvgyhwbafz@smtp.gmail.com');

      //Mail options
    var mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
        to: 'adanferguson@gmail.com',
        subject: 'Website contact form',
        text: req.body.message
    };

    smtpTrans.sendMail(mailOpts, function (error, response) {

        if (error)
            res.send({error: 'There was an error sending the email. Try sending the email directly to adanferguson@gmail.com.'})
        else
            res.send({msg: 'Email sent, I will get back to you soon!'})
    });

});

module.exports = router;
