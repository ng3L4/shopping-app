module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,js,css,html,iml}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};