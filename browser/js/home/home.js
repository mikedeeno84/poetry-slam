app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeController',
        resolve: {
        	poems : function(PoemFactory){
        		return PoemFactory.getPoems()
        		.then(null, console.log)
        	},
        }
    });
});

app.controller('homeController', function ($scope, poems, $window, SpeechFactory,$q){ 
    $scope.poems = poems;
    console.log($scope.poems)
    $scope.synth = $window.speechSynthesis;
    $scope.listen = function(poem){
        SpeechFactory.formatSpeech(poem)
        .then(function(formattedLines){
            formattedLines.forEach(function(line){
                $scope.synth.speak(line);
            })
        })


    };
});