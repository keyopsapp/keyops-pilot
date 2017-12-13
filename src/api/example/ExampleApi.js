export default class ExampleApi {
    constructor(apiCore) {
        this.API = apiCore;
    }

    getPeople() {
        return this.API.get(ExampleApi.examplePath);
    }
}

ExampleApi.examplePath = '/api/example';
