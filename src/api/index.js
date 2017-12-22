import ApiCore from './ApiCore';
import ExampleApi from './ExampleApi';
import DxSurveyApi from './DxSurveyApi';

class API {
    constructor() {
        this.apiCore = new ApiCore();
        this.exampleApi = new ExampleApi(this.apiCore);
        this.surveyApi = new DxSurveyApi(this.apiCore);
    }
}

const api = new API();
export default api;
