import { RESTDataSource } from 'apollo-datasource-rest';

export class PeopleAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://swapi.dev/api/';
    }

    async getPeople(page = 1) {
        return this.get(`people/?page=${page}`);;
    }

    async getPerson(name: string) {
        const people = await this.get(`people/?search=${name}`);
        people.results = await Promise.all(people.results.map(async (person: any) => {
            const homeworld = await this.get(person.homeworld);
            return { ...person, homeworld: homeworld.name };
        }));
        return people;
    }
}