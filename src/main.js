(function(){
	'use strict';

	angular.module('app.core', [
		'ui.router',

		'app.auth',
		'app.handler',
		'app.shelf',
		'app.viewer',
		'app.publication',
		'app.reader.pdf',
		]);

	angular.module('app', ['app.core']);

	angular.module('app')
		.run(Run)
		.config(Config)
		.constant('Environment', {
			isDevelopment: function(){ return true; }
		})
		.constant('Server', {
			remote: function(){ return 'http://poliedro.viewer.poligno.com'; }
		})

	function Run($rootScope, Auth)
	{
		Auth.login().then(function(user){
			$rootScope.user = user;
		});
	}

	function Config($logProvider, $urlRouterProvider, Environment)
	{

		$logProvider.debugEnabled(Environment.isDevelopment());

		var defaultRoute = 'shelf';

		$urlRouterProvider
			.when('/', defaultRoute)
			.otherwise(defaultRoute);

	}

})();