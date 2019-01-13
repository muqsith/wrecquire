const db = require('./db');


class ModuleA {
    constructor(config) {
        this.config = config;
    }

    getData() {
        return new Promise((resolve, rejct) => {
            db.getData((err, data) => {
                if (err) {
                    rejct(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}


module.exports = ModuleA;
