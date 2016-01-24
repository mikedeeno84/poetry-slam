app.factory('PoemFactory', function($http){
	var PoemFactory = {};
	PoemFactory.getPoems = function () {
		return $http.get("/api/poetry")
		.then(function(response){
			var poems = response.data;
			//temporarily format poem object until database is setup
			return poems;
		})
	}
	return PoemFactory;
});