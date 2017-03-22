export default class ExampleApi {
    constructor(apiCore) {
        this.API = apiCore;
    }

    getPeople() {
        return this.API.get(ExampleApi.examplePath);
    }

    getPerson(id) {
        return this.API.get(ExampleApi.examplePath + `/${id}`);
    }

    createPerson(person) {
        return this.API.post(ExampleApi.examplePath, person);
    }

    updatePerson(id, nextPerson) {
      return this.API.put(ExampleApi.examplePath + `/${id}`, nextPerson);
    }

    deletePerson(id) {
      return this.API.delete(ExampleApi.examplePath + `/${id}`);
    }
}

ExampleApi.examplePath = '/api/example';
