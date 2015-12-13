(function(){
	'use strict';

	angular.module('app.viewer', ['ui.router'])
		.config(Config)
		.controller('ViewerController', ViewerController)

	function Config($stateProvider)
	{

		$stateProvider
			.state('viewer', {
				url: '/viewer/:publicationLabel',
				templateUrl: 'viewer/viewer.tpl.html',
				controller: 'ViewerController'
			});

	}

	function ViewerController($log, $scope, $stateParams, Publication)
	{

		$scope.publication = {};

		Publication.getByLabelFull($stateParams.publicationLabel)
			.then(function(publication){
				$scope.publication = publication;
			});

	}

})();