module.exports = `
  type Info {
    _id: String
    en: Info!
    arm: Info!
    phone: Info!
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
    address: [Info!]
    workingHours: [Info!]
  }
`;