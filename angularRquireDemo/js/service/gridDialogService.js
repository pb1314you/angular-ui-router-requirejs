define(['app'],function(app){
    app.register.factory('gridDialog', ['$compile', '$rootScope', function($compile, $rootScope) {
		return function(options) {
			var defaults = {
			title: '标题',
			content: '',
			width:'800',
			dialogShow: function() {}, //对话框即将显示事件
			dialogShown: function() {}, //对话框已经显示事件
			dialogHide: function() {}, //对话框即将关闭
			dialogHidden: function() {}, //对话框已经关闭事件
			sureClick:function(){},
			scope:$rootScope,
			}
			var modalID = '';
			var options = angular.extend(defaults, options);
			var elm;
			var modal = {
				open: function() {
					var tmpHtml='<div class="modal" style="overflow-x:hidden;overflow-y:auto;"ng-style="modalStyle">{{modalStyle}}<div class="modal-window-dialog" style="width:'+options.width+'px;"><div class="modal-content"><div class="modal-header">{title}<button type="button"class="close"data-dismiss="modal"aria-hidden="true"ng-click="gridDialogClose()">×</button></div><div class="modal-body">{body}</div><div class="modal-footer"><button id="buttonsubmit"class="btn btn-primary"ng-click="gridDialogSure()">确定</button><button id="buttonClose"class="btn btn-default"ng-click="gridDialogClose()">取消</button></div></div></div>{menuCentent}</div>';
					//替换模板标记
					html = tmpHtml.replace(/{title}/g, options.title).replace(/{body}/g, options.content).replace(/{menuCentent}/g,options.menuCentent);
					elm = angular.element(html);
					angular.element(document.body).prepend(elm);
					$rootScope.gridDialogClose = function() {
						modal.close();
					};
					$rootScope.gridDialogSure = function() {
						var result=options.sureClick();
						if(!!result)return;
						modal.close();
					};
					$rootScope.modalStyle = {
						"display": "block"
					};
//					$compile(elm)($rootScope);
					$compile(elm)(options.scope);
					if(!!options.dialogShown()){
						options.dialogShown();
					}
					elm.on('shown.bs.modal', function() {
						options.dialogShown();
					});
					elm.on('hide.bs.modal', function() {
						options.dialogHide();
					});
					elm.on('hidden.bs.modal', function() {
						options.dialogHidden();
						modalObj.remove();
					});
				},
				close: function() {
					if(elm) {
						elm.remove();
					}
				}
			};
			return modal;
		};
	}]);
})
