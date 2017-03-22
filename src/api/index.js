import ApiCore from './ApiCore';
import ExampleApi from './example/ExampleApi';

class API {
  constructor() {
    this.apiCore = new ApiCore();
    this.exampleApi = new ExampleApi(this.apiCore);
  }
}

const api = new API();
export default api;
