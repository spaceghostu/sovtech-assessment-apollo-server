import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        person(
            name: String,
        ): Response
        people(
            page: Int
        ): Response
    }
    type Person  {
        name: String
        height: String
        mass: String
        gender: String
        homeworld: String
    }
    type Response {
        count: String
        next: String
        previous: String
        results: [Person]
    }
`;
