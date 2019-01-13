const path = require('path');

function wrequire(modulePath) {
    console.log('fileName: ', __filename)
    console.log('dirName', __dirname);
    return require(path.resolve(__dirname, modulePath));
}

module.exports = wrequire;
