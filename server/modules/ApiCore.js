const axios = require('axios');
const AxiosError = require('./AxiosError');

class ApiCore {
    constructor(apiConfig, authToken) {
        this.apiConfig = apiConfig;
        this._AXIOS = generateAxiosInstance(apiConfig);
    }

    delete(urlPath) {
        return this._AXIOS.delete(urlPath)
            .then(res => res.data)
            .catch(cleanErrors);
    }

    get (urlPath, params) {
        return this._AXIOS.get(urlPath, {params})
            .then((res) => res.data)
            .catch(cleanErrors);
    }

    post(urlPath, data) {
        return this._AXIOS.post(urlPath, data)
            .then(res => res.data)
            .catch(cleanErrors);
    }


    put(urlPath, data) {
        return this._AXIOS.put(urlPath, data)
            .then(res => res.data)
            .catch(cleanErrors);
    }
}

function generateAxiosInstance(apiConfig) {
    var axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        timeout: 15000,
        ...apiConfig
    };

    return axios.create(axiosConfig);
}

function cleanErrors(error) {
    if (error.config) {
        throw new AxiosError(error);
    }

    throw error;
}

module.exports = ApiCore;