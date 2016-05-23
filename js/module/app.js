(function() {
	var home = angular.module('main', ['winjs', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'main.controllers', 'main.services', 'main.directives'])
	
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider
		
		.state('home', {
			url: '/',
			templateUrl: 'templates/home/index.html',
			controller: 'MainCtrl'
		})
		
		.state('fun', {
			url: '/projects',
			templateUrl: 'templates/fun/index.html',
			controller: 'ProjectsCtrl'
		})
		
		.state('finance', {
			url: '/finance',
			templateUrl: 'templates/finance/index.html',
			controller: 'FinanceCtrl'
		})
        
        .state('report', {
            url: '/report/:ticker',
            templateUrl: 'templates/report/index.html',
            controller: 'ReportCtrl'
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
