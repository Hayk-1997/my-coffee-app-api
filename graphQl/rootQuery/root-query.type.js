const queryEntryPoints = `
  type RootQuery {
    # get AwesomeSlider
    AwesomeSlider: AwesomeSlider,
    # get Info
    Info: Info,
    # get OurHistory
    OurStory: OurStory, 
    # get Services
    Services: Services,
    # get OurMenu
    OurMenu: OurMenu,
    # get StaticCounter
    StaticCounter: StaticCounter,
    # get Products
    Products: Products
  }
`;

module.exports = queryEntryPoints;