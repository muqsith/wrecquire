const { createProfile, getData } = require('./module-b');


const getProfile = async () => {
    return await getData();
}

module.exports = {
    getProfile,
    setProfile: createProfile
}
