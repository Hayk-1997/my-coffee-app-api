module.exports = `
  type Info {
    _id: String
    en: Info!
    am: Info!
    phone: Info!
    address: Info!
    workingHours: Info!
    icon: Info!
    item: Info!
    download_url: String!
    preview_url: String!
    format: String!
    tags: [Info!]
    size: Int!
    number: String
    description: String
    title: String!
  }
`;