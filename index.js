var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var parseString = require('xml2js').parseString;
var fs = require('fs');

var IMPORT_TYPE = {
  SITEMAP: 1, 
  ARRAY: 2,
};
 
var defaultOptions = {
  outputDir: '',
  importType: IMPORT_TYPE.SITEMAP,
  importSitemapPath: '',
  importArray: [],
};

/**
 * Url to filename builder
 */
function makeFilename(page, saveto) {
  var filename = page;
  
  // Remove protocol
  filename = filename.replace('http://', '');
  filename = filename.replace('https://', '');
  
  // Replace /
  while (filename.indexOf('/') >= 0) {
    filename = filename.replace('/', '~');
  }
  return saveto + '/' + filename;
}

/**
 * Runs PhantomJS to download HTML of page
 */
function grabPage(page, saveto) { 

  console.log(makeFilename(page, saveto));
  
  // Define arguments
  var childArgs = [ path.join(__dirname, 'grabpage.js'), page, makeFilename(page, saveto)];

  // Call PhantomJS
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    if (err != null) { console.log(err); }
    if (stdout != null) { console.log(stdout); }
    if (stderr != null) { console.log(stderr); }
  });
}

/**
 * Parse sitemap.xml and grab all pages
 */
function grabFromSitemap(sitemapPath, saveto) {
  fs.readFile(sitemapPath, function (err, data) {
    parseString(data, function (err, result) {
        result.urlset.url.forEach(function(url) {
          grabPage(url.loc[0], saveto);
        });
    });
  });
}

/**
 * Grab all pages from given array
 */
function grabFromArray(pageArray, saveto) {
  pageArray.forEach(function(page) {
    grabPage(page, saveto);
  });
}

// Module GLOBAL
module.exports = {
  options: defaultOptions,
  run: function() {
    switch(module.exports.options.importType) {
      case IMPORT_TYPE.SITEMAP:
        grabFromSitemap(module.exports.options.importSitemapPath, module.exports.options.outputDir);
      break;
      
      case IMPORT_TYPE.ARRAY:
        grabFromArray(module.exports.options.importArray, module.exports.options.outputDir);
      break;
    }
  },
};