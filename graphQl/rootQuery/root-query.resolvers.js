const AwesomeSliderController = require('../../controllers/Coffee/AwesomeSliderController');
const InfoController = require('../../controllers/Coffee/InfoController');
const OurStoryController = require('../../controllers/Coffee/OurStoryController');
const ServicesController = require('../../controllers/Coffee/ServicesController');
const OurMenuController = require('../../controllers/Coffee/OurMenuController');
const StaticCounterController = require('../../controllers/Coffee/StaticCounterController');
const ProductController = require('../../controllers/Coffee/ProductController');
// must match the field items in RootQuery
const rootQueryResolvers = {
  async AwesomeSlider () {
    return await AwesomeSliderController.get();
  },
  async Info () {
    return await InfoController.get();
  },
  async OurStory () {
    return await OurStoryController.get();
  },
  async Services() {
    return await ServicesController.get();
  },
  async OurMenu() {
    return await OurMenuController.get();
  },
  async StaticCounter() {
    return await StaticCounterController.get();
  },
  async Products() {
    return await ProductController.get();
  }
};

module.exports = rootQueryResolvers;
