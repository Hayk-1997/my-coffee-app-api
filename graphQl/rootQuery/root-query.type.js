const queryEntryPoints = `
  type RootQuery {
    # get AwesomeSlider
    AwesomeSlider: AwesomeSlider,
    # get Info
    Info: Info,
    # get OurHistory
    OurHistory: OurHistory, 
    # get Services
    Services: Services,
    # get OurMenu
    OurMenu: OurMenu,
  }
`;

module.exports = queryEntryPoints;