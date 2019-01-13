const modc = require('./modules/module-c');



function api_1() {
    return modc.getProfile()
    .then((profile) => {
        return modc.setProfile(profile);
    })
    .catch((err) => {
        console.error(err);
    });
}

module.exports = api_1;
