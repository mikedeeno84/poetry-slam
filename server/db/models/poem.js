var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String
    },
    text:{
        type:[String],
    },
    author:{
        type: String,
    },
    lineInfo:{
        type:[String]
    }
});

mongoose.model('Poem', schema);
