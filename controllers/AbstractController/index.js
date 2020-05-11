class AbstractController {
    constructor (legs) {
        this.legs = legs;
    }

    /**
     * @return {string}
     * @param image
     */
    static URLAttribute = (image) => {
        return process.env.API_URL + '/' + image;
    };
}

module.exports = AbstractController;
// module.exports = new AbstractController();