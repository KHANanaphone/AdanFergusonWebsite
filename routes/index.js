var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/*', function(req, res) {

    var url = req.url.substring(1);

    if(!url)
        url = '';

    var pages = {
        '': {name: 'Home', view: 'home'},
        about: {name: 'About Me', view: 'about'},
        projects: {name: 'Projects', view: 'projects'},
        contact: {name: 'Contact', view: 'contact'},
    };

    var currentPage = pages[url];

    console.log('CP: ' + JSON.stringify(currentPage));

    if(!currentPage)
        return res.redirect('/');

    res.render(currentPage.view, {
        title: 'Express',
        pages: pages,
        currentPage: currentPage.view
    });
});

module.exports = router;
