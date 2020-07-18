module.exports =  `
  type AwesomeSlider {
    _id: String!
    image: String!
    title: String!
    description: String!
    am: [AwesomeSlider!]
    en: [AwesomeSlider!]
  }
`;