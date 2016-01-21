var rp = require('request-promise');
var apiKey = "AIzaSyC3BnyTstjr2A1TpTL6bbVphSZdCQk5BPs"



var latlong = "40.733,-73.996"
var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlong + '&key=' + apiKey;
rp(url)
	.then(function(res) {
		var info=JSON.parse(res)
		console.log(info.results)
		var addressComponents=info.results[0].address_components;
		// console.log(addressComponents)
	}).then(null, console.log)