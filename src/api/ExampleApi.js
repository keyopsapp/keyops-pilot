export default class ExampleApi {
    constructor(apiCore) {
        this.API = apiCore;
    }

    getExample() {
        return this.API.get(ExampleApi.examplePath);
    }
}

ExampleApi.examplePath = '/api/example';
