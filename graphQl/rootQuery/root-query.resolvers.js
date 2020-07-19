const AwesomeSliderController = require('../../controllers/Coffee/AwesomeSliderController');
const InfoController = require('../../controllers/Coffee/InfoController');
// must match the field items in RootQuery
const rootQueryResolvers = {
    async AwesomeSlider () {
        return await AwesomeSliderController.get();
    },
    async Info () {
        return await InfoController.get();
    }
};

module.exports = rootQueryResolvers;
