(function(){
	'use strict';

	angular.module('app.shelf', ['ui.router'])
		.config(Config)
		.controller('ShelfController', ShelfController)

	function Config($stateProvider)
	{

		$stateProvider
			.state('shelf', {
				url: '/shelf',
				templateUrl: 'shelf/shelf.tpl.html',
				controller: 'ShelfController'
			});

	}

	function ShelfController($log, $scope, $stateParams, Server, Publication)
	{

		$scope.coverUrlPrefix = Server.remote() + '/api/provisioning/cover/';
		$scope.publications = [];

		$scope.$watch('user', function(user){
			if (!user) return;

		Publication.list()
			.then(function(publications){
				$scope.publications = publications;
			});

		});
		
	}

})();