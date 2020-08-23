const AwesomeSliderController = require('../../controllers/Coffee/AwesomeSliderController');
const InfoController = require('../../controllers/Coffee/InfoController');
const OurHistoryController = require('../../controllers/Coffee/OurHistoryController');
const ServicesController = require('../../controllers/Coffee/ServicesController');
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
  },
  async Services() {
    return await ServicesController.get();
  }
};

module.exports = rootQueryResolvers;
