define(['app'], function(app) {
	app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
			app.register = {
				//得到$controllerProvider的引用
				controller: $controllerProvider.register,
				//同样的，这里也可以保存directive／filter／service的引用
				directive: $compileProvider.directive,
				filter: $filterProvider.register,
				service: $provide.service,
				factory: $provide.factory
			};
		})
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			//$urlRouterProvider.otherwise('home');
			function moduleReady($q, modules) {
				var deferred = $q.defer();
				//异步加载controller／directive/filter/service
				require([modules], function() {
					deferred.resolve();
				});
				return deferred.promise;
			}

			function Resolve(ctrl) {
				this.loadCtrl = ["$q", function($q) {
					return moduleReady($q, ctrl);
				}];
			}

			$urlRouterProvider.when("", "/index");
			$stateProvider
				.state('index', {
					url: '/index',
					views: {
						'content': {
							templateUrl: 'pages/content.html'
						},
						'footer': {
							templateUrl: 'pages/footer.html'
						},

					}
				})
				.state('page2', {
					url: '/page2',
					views: {
						'content': {
							templateUrl: 'pages/page2.html'
						},
						'footer': {
							templateUrl: 'pages/footer.html'
						},

					}
				})
				.state('index.body1', {//子状态
					url: '/body1',
					views: {
						'pages': {
							controller: 'body1Ctrl',
							templateUrl: "pages/body1.html",
							resolve: new Resolve('controller/body1Ctrl'),
						}
					}
				})
				.state('index.body2', { //部门资料
					url: '/body2',
					views: {
						'pages': {
							template: '<div>我是身体22<br>名字:<span ng-bind="bodyname"></span></div>',
							controller: function($scope, $stateParams) {
							      $scope.bodyname = "name22";
							}
						}
					}
				})
				
				//				.state("index.home", {
				//					url: "/home",
				//					controller: 'homeCtrl',
				//					//		template: '<p>{{str}}</p><br/>'+
				//					//                  '过滤器应用：<span>{{sex | sexFilter}}</span><br/><br/>'+
				//					//                  'Service应用：<span ng-repeat="book in books">{{book.id + 1}}：《{{book.name}}》</span><br/><br/>'+
				//					//                  '指令应用：<my-directive></my-directive>',
				//					templateUrl: "pages/home.html",
				//					resolve: {
				//						loadCtrl: ["$q", function($q) {
				//							var deferred = $q.defer();
				//							//异步加载controller／directive/filter/service
				//							require([
				//								'controller/homeCtrl'
				//							], function() {
				//								deferred.resolve();
				//							});
				//							return deferred.promise;
				//						}]
				//					},
				//				})
		}]);
	app.run(['$rootScope', '$log', '$http', function($rootScope, $log, $http) {
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			var name = $rootScope.$state.current.name;
	        $log.debug('successfully changed states') ;
	        $log.debug('event', event);
	        $log.debug('toState', toState);
	        $log.debug('toParams', toParams);
	        $log.debug('fromState', fromState);
	        $log.debug('fromParams', fromParams);
	});

		$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
			$log.error('The request state was not found: ' + unfoundState);
		});

		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			$log.error('An error occurred while changing states: ' + error);

			$log.debug('event', event);
			$log.debug('toState', toState);
			$log.debug('toParams', toParams);
			$log.debug('fromState', fromState);
			$log.debug('fromParams', fromParams);
		});
	}]);
})