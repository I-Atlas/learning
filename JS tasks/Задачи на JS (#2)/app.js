const fs = require('fs');

fs.readFile('numberToText.js', (err, data) => {
    if (err) {
        console.log('err', err);
        return
    }
    console.log('data', data);
    
})