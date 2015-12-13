(function(){
	'use strict';

	angular.module('app.handler', [])
		.service('Handler', Handler)

	function Handler($log)
	{
		this.generic = generic;

		function generic()
		{
			$log.error('Houve um erro inexperado', arguments);
		}
	}

})();