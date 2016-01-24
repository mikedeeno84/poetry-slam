app.directive('poem', function () {
	return {
		restrict: 'E',
		templateUrl:'js/common/directives/poem-display/poem.html',
		scope:{
			poem: '=',
			listen: '&'
		}
	};
});