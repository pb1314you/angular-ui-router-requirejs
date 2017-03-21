(function(window){
	require.config({
	baseUrl: 'js/',
	paths: {
		jquery: 'base/jquery-2.2.3.min',
		bootstrap: 'base/bootstrap/js/bootstrap.min',
		angular: 'base/angular.min',
		mainRouter:'mainRouter',
		router: 'base/angular-ui-router',
		angularAnimate:'base/angular-animate.min',
		app: "app",
		mainCtrl:"mainCtrl"
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		},
		angular: {
			exports: 'angular'
		},
		mainRouter:{
			deps: ['angular','jquery']
		},
		router: {
			deps: ['angular']
		},
		app: {
			deps: ['router']
		},
		angularAnimate: {
			deps: ['angular']
		}
	}
});
require(['jquery', 'bootstrap', 'app','mainCtrl','mainRouter','angularAnimate'], function() {
	angular.bootstrap(document, ['myModule']);
});
})(window)


