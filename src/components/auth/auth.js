(function(){
	'use strict';

	angular.module('app.auth', [])
		.service('Auth', Auth);

	function Auth($http, Server)
	{
		this.login = login;

		function login()
		{
			var aplicationId = 'poliedro';
			var appVersion = '3.2.0';
			var config = {
				url: Server.remote() + '/api/provisioning/login/' + aplicationId + '/' + appVersion,
				method: 'POST',
				dataType: 'json',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: 'login=suporte@lumis.com.br&password=lumis&deviceId=webviewer'
			}
			return $http(config);
		}

	}

})();