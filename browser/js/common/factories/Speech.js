app.factory('SpeechFactory', function($http, $q){
	var SpeechFactory = {};

	var setOptions = function(tone, utterance){
		//use bracket notation to access keys here
		var settings = {
			neutral: {
				volume: .5,
				pitch: 1.0,
				rate: .85,
			},
			negative: {
				volume: .55,
				pitch: .95,
				rate: .8,
			},
			positive:{
				volume: .50,
				pitch: 1.05,
				rate: .9,				
			}
		}
		utterance.volume = settings[tone].volume;
		utterance.pitch = settings[tone].pitch;
		utterance.rate = settings[tone].rate;
		return utterance;
	}

	SpeechFactory.formatSpeech = function(poem) {
		var SpeechFactory = this;
		var lines = poem.text;
		var lineInfo = poem.lineInfo
		console.log(poem.lineInfo.length, poem.text.length)
		if (poem.lineInfo.length !== poem.text.length){
			lineInfo = SpeechFactory.getLineStats(poem);
		}
		console.log(lineInfo)
		return $q.when(lineInfo)
			.then(function(lineInfo){
				var formattedArray = lines.map(function(line, index){
					var spokenLine = new SpeechSynthesisUtterance(line);
					poem.lineInfo = lineInfo;
					spokenLine.lang = "en-GB";
					spokenLine.volume = .5
					return setOptions(lineInfo[index], spokenLine)			
				})
				return formattedArray;
			})
		var lineInfo = ["neutral", "negative","negative","neutral", "negative"]

	}
	SpeechFactory.getLineStats = function(poem){
		return $http.put('/api/poetry/' + poem._id, {})
			.then(function(res){
				return res.data;
			})
	}
	return SpeechFactory
})