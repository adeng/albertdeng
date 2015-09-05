(function() {
	var home = angular.module('main', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'main.controllers', 'main.services'])
	
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider
		
		.state('home', {
			url: '/',
			templateUrl: 'templates/home/index.html',
			controller: 'MainCtrl'
		})
		
		.state('finance', {
			url: '/finance',
			templateUrl: 'templates/finance/index.html',
			controller: 'FinanceCtrl'
		})
		
		.state('about', {
			url: '/about',
			templateUrl: 'templates/about/index.html',
			controller: 'AboutCtrl'
		});
		
		$urlRouterProvider.otherwise("/");
		
		// $locationProvider.html5Mode(true);
	});
})();
