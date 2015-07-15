var page = require('webpage').create();
var fs = require('fs');
var system = require('system');
var args = system.args;


var pageUrl = args[1];
var savePath = args[2];

page.open(pageUrl, function () {
    console.log('Grabbed: ' + pageUrl);
    fs.write(savePath, page.content, 'w');
    phantom.exit();
});