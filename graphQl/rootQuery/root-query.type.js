const queryEntryPoints = `
  type RootQuery {
    # get an AwesomeSlider
    AwesomeSlider: AwesomeSlider,
    # returns an array of Info
    Info: Info,
  }
`;

module.exports = queryEntryPoints;