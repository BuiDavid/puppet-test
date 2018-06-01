// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Test-Server',
	'brand': 'Test-Server',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
        //'ssl' : 'true',
        //'port' : '3000',
	//'ssl port' : '3001', 
        'mongo' : 'Admin:admin123@127.0.0.1:27017' ,
	'port': process.env.PORT || 3000,
	'ssl port': process.env.SSL_PORT || 3001,
	'ssl public port': 443,
	'ssl': 'force', 
	'ssl cert': '/home/dtbui/myKeystoneApp/node_modules/letsencrypt/cert.pem', 
	'ssl key': '/home/dtbui/myKeystoneApp/node_modules/letsencrypt/privkey.pem',
	letsencrypt: {
		email: 'david.bui@carnwennan.com',
		domains: ['le-testserver.ddns.net', '172.250.1.121'],
		register: true,
		tos: true,
		production: process.env.PRODUCTION
}


});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server



keystone.start();
