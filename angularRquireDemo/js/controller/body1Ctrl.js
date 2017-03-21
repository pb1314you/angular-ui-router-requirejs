define(['app'],function(app){
	app.register.controller('body1Ctrl', function($rootScope,$scope){
		$scope.bodyname = "name11";
		
	})
	
    //《AngularJS过滤器filter入门》http://www.cnblogs.com/wangmeijian/p/4979452.html
    app.register.filter('sexFilter', function(){
        return function(sex){
            return ['男','女'][sex];
        }
    })    
    //《AngularJs指令配置参数scope详解》http://www.cnblogs.com/wangmeijian/p/4944030.html
    app.register.directive('myDirective', function(){
        return {
            restrict: "E",
            replace: true,
            template: "<div><span>我是由自定义指令渲染出来的</span></div>"
        }
    })
})