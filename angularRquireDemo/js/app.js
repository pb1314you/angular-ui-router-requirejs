define(['angular', 'router'], function() {
	var app = angular.module("myModule", ['ui.router'])
	app.run(function($rootScope, $state, $stateParams) {
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;
	});
	return app;
})