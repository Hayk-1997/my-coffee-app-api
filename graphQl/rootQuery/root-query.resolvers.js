const AwesomeSliderController = require('../../controllers/Coffee/AwesomeSliderController');
const InfoController = require('../../controllers/Coffee/InfoController');
const OurHistoryController = require('../../controllers/Coffee/OurHistoryController');
// must match the field items in RootQuery
const rootQueryResolvers = {
  async AwesomeSlider () {
    return await AwesomeSliderController.get();
  },
  async Info () {
    return await InfoController.get();
  },
  async OurHistory () {
    return await OurHistoryController.get();
  }
};

module.exports = rootQueryResolvers;
