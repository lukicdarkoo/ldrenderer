# ldrenderer
Simple node module which enables to download and store single page applications for SEO

## Sample usage
	var renderer = require("ldrenderer");
	
	renderer.options.importType = IMPORT_TYPE.SITEMAP;
	renderer.options.importSitemapPath = path.join(__dirname, '../../web/sitemap.xml');
	renderer.options.outputDir = path.join(__dirname, '../../web/builds/rendered');
	renderer.run();