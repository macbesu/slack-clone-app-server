export default `
  type User {
    id: Int!
    username: String!
    email: String!
    team: [Team!]!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers(id: Int!): [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;