import axios from 'axios';
import AxiosError from './AxiosError';

export default class ApiCore {
    constructor(apiConfig, authToken) {
        this.apiConfig = apiConfig;
        this._AXIOS = generateAxiosInstance(apiConfig);
    }

    delete(urlPath) {
        return this._AXIOS.delete(urlPath).then(res => res.data).catch(cleanErrors);
    }

    get (urlPath, params) {
        return this._AXIOS.get(urlPath, {params}).then(res => res.data).catch(cleanErrors);
    }
    //
    postForm(urlPath, data) {
        return this._AXIOS({
            method: 'post',
            url: urlPath,
            data: data,
            config: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}

        }).then(res => res.data).catch(cleanErrors);
    }

    post(urlPath, data) {
        return this._AXIOS.post(urlPath, data).then(res => res.data).catch(cleanErrors);
    }

    put(urlPath, data) {
        return this._AXIOS.put(urlPath, data).then(res => res.data).catch(cleanErrors);
    }
}

function generateAxiosInstance(apiConfig) {
    const axiosConfig = {
        headers: {
            // Accept: '*/*',
            // 'X-Requested-With': 'XMLHttpRequest',
            // Host: 'surveyjs.io',
            // Origin: 'https://surveyjs.io',
            // Pragma: 'no-cache',
            // Referer: 'https://surveyjs.io/Service/EditSurvey/de9a56a9-a3de-4c80-80bb-59f8986aefb1',
            // 'Content-Type': 'application/x-www-form-urlencoded;'

        },
        timeout: 15000
    };

    return axios.create(axiosConfig);
}

function cleanErrors(error) {
    if (error.config) {
        throw new AxiosError(error);
    }

    throw error;
}
