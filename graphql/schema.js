
import { buildSchema } from 'graphql';

export const schema = buildSchema(`

  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String]!
    attendance: Int!
  }

  input EmployeeFilter {
    name: String
    age: Int
    class: String
  }

  type User {
    id: ID!
    email:String
    password:String!
    username:String
    role:String
  }

  type AuthPayload {
    token: String
    user: User
  }
  
  type SignupResponse {
    message: String!
  }
  

  type Query {
    employees(page: Int, limit: Int, sortBy: String, filter: EmployeeFilter): [Employee]
    employee(id: ID!): Employee
  }

  
  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(email: String!, password: String!, role: String!): SignupResponse!

    addEmployee(name: String!, age: Int!, class: String!, subjects: [String]!, attendance: Int!): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Int): Employee
  }
`);
