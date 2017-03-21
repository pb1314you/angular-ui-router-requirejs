define(['app'], function(app) {
	(function(app){
		function datetimePicker(){
			return {
				restrict:"A",
				require:"ngModel",
				link:function(scope,elem,attrs,ctrl){
					var pickerOption={
							onpicked:function(){
								var val=elem.val();
								ctrl.$setViewValue(val);
								scope.$digest();
							},
							onclearing:function(){
								ctrl.$setViewValue("");
								scope.$digest();					
							},
					};
					pickerOption["dateFmt"]=attrs.format;
					if(attrs.quicksel){
							var quickselStr=attrs.quicksel.replace(/\[|]|'|'/g,'').split(',')
							pickerOption["quickSel"]=quickselStr;
					}						
					elem.on("click",function(){			
						WdatePicker(pickerOption);
					});
				}
			}			
		}
		app.directive("datetimePicker",datetimePicker);	
		"use strict";
		function shrinkController($element) {
		  this.$postLink = function() {
					$element.find(".shrink-btn").on("click",function(){
						$(".ui-content-left").hide();
						$(".ui-content-right").animate({
							"margin-left": "0",
						}, 800, "swing", function() {
							$(".ui-content-left").hide();
							$(".shrink-btn").hide();
							$(".shrink-btn-reverse").show();
							$(".ui-content-right").addClass("extend");
						});					
					});
					$element.find(".shrink-btn-reverse").on("click",function(){
						$(".ui-content-right").animate({
							"margin-left": "30%",
						}, 800, "swing", function() {
							$(".ui-content-left").show();
							$(".shrink-btn").show();
							$(".shrink-btn-reverse").hide();
							$(".ui-content-right").removeClass("extend");
						});			
					});				
		  };
		}
		app.component('shrink', {
				template:'<div><a class="shrink-btn"><img src="img/shrink1.png"></a>\
				<a class="shrink-btn-reverse"><img src="img/shrink2.png"></a></div>',
		 		 controller: shrinkController,
		});	
	})(app);		
})