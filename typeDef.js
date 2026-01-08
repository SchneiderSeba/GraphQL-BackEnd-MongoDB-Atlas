import { gql } from 'apollo-server';

const typeDefs = gql`

  type ID {
    id: String!
  }

  type User {
    id: ID!
    username: String!
    name: String!
    email: String!
    blogs: [Blog!]!
    comments: [String!]!
  }

  type Blog {
    _id: ID!
    title: String!
    url: String!
    likes: Int!
  }

  type Query {
    usersCount: Int!
    allPersons: [User!]!
    findUser(username: String!): User
    first2Users: [User!]!
  }
  input UserInput {
    username: String
    name: String
    email: String
  }
  
  type Mutation {
    addUser(username: String!, name: String!, email: String!): User!
    editUser(id: ID!, user: UserInput!): User!
    deleteAllUsers: Int!
    deleteUserById(id: ID!): User!
  }

`;

export default typeDefs;