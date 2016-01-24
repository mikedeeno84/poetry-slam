var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var path =  require('path')
var rp =  require('request-promise');
var apikey = require('../../../../apikey.js').alchemy
var url = "http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment";
var Poem = mongoose.model('Poem');
var options = {
    method: 'POST',
    uri: url,
    form: {
        apikey: apikey,
        outputMode: "json",
        // text: "you, over there, you be the girl" // Will be urlencoded 
    },
    headers: {
		'content-type': 'application/x-www-form-urlencoded'
    }
};

//below models a backend api post request with the options defined above
// rp(options).then(function(res){
// 	var info = JSON.parse(res)
// 	console.log(info.docSentiment.type)
// })

router.get('/', function (req, res, next) {
	Poem.find({}).exec()
	.then(function(poems){
		res.status(200).json(poems);
	}).then(null, next)
})
router.put('/:poemId', function(req, res, next){
	Poem.findOne({_id:req.params.poemId}).exec()
	.then(function(poem){
		var lines = poem.text;
		var infoPromises = lines.map(function(line){
			options.form.text = line;
			return rp(options)
				.then(function(res){
					var info = JSON.parse(res);
					return info.docSentiment.type
				});
			});
		Promise.all(infoPromises)
			.then(function(info){
				poem.lineInfo = info;
				return poem.save()
			}).then(function(poem){
				res.status(201).json(poem.lineInfo);
			}).then(null, next)
	})
})
router.post('/', function(req, res, next){
})

module.exports = router;