import ApiCore from './ApiCore';
import ExampleApi from './ExampleApi';
import SurveyApi from './SurveyApi';

class API {
    constructor() {
        this.apiCore = new ApiCore();
        this.exampleApi = new ExampleApi(this.apiCore);
        this.surveyApi = new SurveyApi(this.apiCore);
    }
}

const api = new API();
export default api;
