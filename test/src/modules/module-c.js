const wrecquire = require('../../../index');
const { createProfile, getData } = wrecquire('./module-b', { before: () => {console.log('Fuck you')}, after: () => {console.log('Fuck you')}});


const getProfile = async () => {
    return await getData();
}

module.exports = {
    getProfile,
    setProfile: createProfile
}
