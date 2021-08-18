import { IResolvers } from '@graphql-tools/utils';

export const resolvers: IResolvers = {
    Query: {
        people: async (source: void, args: { page: number }, context: any) => {
            return context.dataSources.peopleAPI.getPeople(args.page)
        },
        person: async (source: void, args: { name: string }, context: any) => {
            return context.dataSources.peopleAPI.getPerson(args.name)
        },
    },
};
