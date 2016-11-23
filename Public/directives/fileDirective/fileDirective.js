(function () {

  angular
    .module('AdminApp')
    .directive('fileModel', fileModel);

  function fileModel ($parse) {
    return {
      restrict: 'A',
      scope: true,

      link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				})
			})
		}
      }
    };


})();
