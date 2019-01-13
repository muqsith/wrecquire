const db = require('./db');
const ModuleA = require('./module-a');

const moduleA = new ModuleA();

async function getData() {
    return await moduleA.getData();
};

function createProfile(profile) {
    return new Promise((resolve, reject) => {
        db.insertData((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
};

module.exports = {
    getData,
    createProfile
};
