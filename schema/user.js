export default `
  type User {
    id: Int!
    username: String!
    email: String!
    team: [Team!]!
  }
 
  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Boolean!
  }
`;