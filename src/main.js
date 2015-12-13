(function(){
	'use strict';

	angular.module('app.core', [
		'ui.router',

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
			remote: function(){ return 'http://publisher.poligno.com'; }
		})

	function Run($http, Server)
	{

		var aplicationId = 'poliedro';
		var appVersion = '4.0.0';
		var config = {
			url: Server.remote() + '/api/provisioning/login/' + aplicationId + '/' + appVersion,
			method: 'POST',
			dataType: 'json',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: 'login=suporte@lumis.com.br&password=lumis&deviceId=webviewer'
		}
		$http(config);
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