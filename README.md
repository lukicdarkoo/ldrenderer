# ldrenderer
Simple node module which download and store rendered pages of single page applications for SEO

## Sample usage
	var path = require('path');
	var renderer = require("ldrenderer");
	
	renderer.options.importType = renderer.IMPORT_TYPE.SITEMAP;
	renderer.options.importSitemapPath = path.join(__dirname, 'web/sitemap.xml');
	renderer.options.outputDir = path.join(__dirname, 'web/builds/rendered');
	renderer.run();
