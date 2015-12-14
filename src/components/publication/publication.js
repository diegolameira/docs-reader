(function(){
	'use strict';

	angular.module('app.publication', [])
		.service('Publication', Publication)

	function Publication($log, $http, $timeout, $q, $filter, Server, Handler, Auth)
	{

		var cache;
		var lastTimeCache;
		var hour = 3606358;
		var _url = Server.remote() + '/api/provisioning';

		this.list = list;
		this.getByLabel = getByLabel;
		this.getByLabelFull = getByLabelFull;

		function request(params)
		{
			var url = _url + '/publication';
			if (params)
				url += '/' + params;
			return $http.get(url)
				.then(function(response){
					return response;
				})
				.catch(Handler.generic);
		}

		function list()
		{
			return $q(function(resolve){
				if ( cache && isCacheValid() )
					resolve(cache);
				else
					resolve(request().then(saveCache));
			});

			function isCacheValid()
			{
				return Date.now() < lastTimeCache + hour;
			}

			function saveCache(response)
			{
				cache = response.data;
				lastTimeCache = Date.now();
				return cache;
			}
		}

		function getByLabel(label)
		{
			var key = 'friendlyId';
			return list().then(function(publications){
				return publications.find(function hasLabel(value){
					return value.hasOwnProperty(key) && value[key] == label;
				});
			});
		}

		function getByLabelFull(label)
		{
			return getByLabel(label).then(function(publication){
				if (!publication.pages)
					request(publication.versionId).then(function(response){

						var _publication = response.data;

						// replicate(_publication);

						angular.extend(publication, _publication);

					});
				return publication;
			});
		}

	}

	function replicate(_publication)
	{
		for(var i=0; i < 7; i++)
		{
			var copy = angular.copy(_publication.pages);
			copy.map(function(item){
				return angular.copy(item)
			});
			_publication.pages = _publication.pages.concat(copy);
		}

		_publication.pages.length = 1000;

		var pages = 0;
		_publication.pages.map(function(page){
			page.label = ++pages;
			return page;
		});

	}

	//////////////////
		
	Array.prototype.find = Array.prototype.find || function(callback, ctx){
		return find.call(this, callback, ctx);
	}

	function find(arr, test, ctx) {
		var result = null;
		arr.some(function(el, i) {
			return test.call(ctx, el, i, arr) ? ((result = el), true) : false;
		});
		return result;
	}

})();