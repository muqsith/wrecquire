

function insertData(cb) {
    setTimeout(function () {
        console.log('inserting data ...');
        cb();
    }, 100);
}


function getData(cb) {
    setTimeout(function () {
        console.log('getting data ...');
        cb();
    }, 100);
}


module.exports = { insertData, getData };
