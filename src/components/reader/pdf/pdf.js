(function(){
	'use strict';

	angular.module('app.reader.pdf', [])
		.directive('readerPdf', ReaderDirective)
		.directive('readerPdfPage', PageDirective)

	function ReaderDirective()
	{

		return {
			restrict: 'EA',
			scope: {
				publication: '='
			},
			templateUrl: 'components/reader/pdf/pdf.tpl.html',
			controller: controller,
			controllerAs: 'ReaderPDFController',
			compile: compile
		};

		function controller($scope, Server)
		{
			$scope.pageUrlPrefix = Server.remote() + '/api/provisioning/media/';
		}

		function compile(tElement, tAttrs)
		{
			return {
				pre: prelink,
				post: postlink
			}

			function prelink(scope, element, attrs)
			{
				var scrollContext = element.find('.pages');
				var windowEvents = 'DOMContentLoaded load resize scroll';
				var $window = $(window);
				var onEvents = _.debounce(_onEvents, 1000);

				scrollContext.on('scroll', onEvents);
				$window.on(windowEvents, onEvents);

				scope.$on('$destroy', $destroy);

				function $destroy()
				{
					ReaderPDFHeight = 0;
					scrollContext.off('scroll', onEvents);
					$window.off(windowEvents, onEvents);
				}

				function _onEvents()
				{
					scope.$broadcast('reader:pdf:reinit');
				}

			}

			function postlink(scope, element, attrs)
			{}
		}
	}

	function PageDirective($http, $compile)
	{

		var template;

		return {
			restrict: 'EA',
			template: '<span class="page-label">{{::page.label}}</span>',
			compile: compile
		};

		function compile(tElement, tAttrs)
		{

			if ( !template )
				$http.get('components/reader/pdf/page.tpl.html')
					.then(function(response){
						template = response.data;
					});

			return link;

			function link(scope, element, attrs)
			{
				var _element = element[0];
				var context = element.parent()[0];
				var compiled;

				scope.$$postDigest(compile);

				scope.$on('reader:pdf:reinit', compile);
				scope.$on('$destroy', $destroy);

				function compile()
				{
					_element.style.minHeight = (function MinHeightCalc(width, page){
						return Math.round(width * page.height / page.width) + 'px';
					})(_element.clientWidth, scope.page);

					if ( compiled )
						compiled = compiled.detach();

					if (isVisible(element, context))
					{
						compiled = compiled || $compile(template)(scope);
						element.append(compiled);
					}
				}

				function $destroy()
				{
					compiled = null;
				}

				function isVisible(el, context)
				{
					if (typeof jQuery === "function" && el instanceof jQuery) {
						el = el[0];
					}
					var limitTop = context.scrollTop;
					var limitBottom = context.scrollTop + context.clientHeight;
					var top = el.offsetTop;
					var bottom = el.offsetTop + el.clientHeight;
					return (
						( top >= limitTop && top <= limitBottom ) ||
						( bottom >= limitTop && bottom <= limitBottom ) ||
						( top < limitTop && bottom > limitBottom )
					);
				}
			}
		}
	}

})();