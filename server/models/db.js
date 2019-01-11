const mongoose = require('mongoose');

mongoose.connect('mongodb://zadeshwar:zadeshwar123@ds119692.mlab.com:19692/zadeshwar', (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');