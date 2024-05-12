import axios from "axios";
import json from './data.json';

const UNSPLASH_API_URL = 'https://api.unsplash.com/';

export default class UnsplashAPI {    
    #httpClient;
    constructor(apiKey) {
        this.#httpClient = axios.create({
            baseURL: UNSPLASH_API_URL,
            params: {
                client_id: apiKey,
                orientation: 'landscape'
            }    
        });
    }

    searchImages(urlParams) {
        return this.#fetch('/search/photos', urlParams);
    }

    async #fetch(resourcePath, urlParams) {
        const response = await this.#httpClient.get(resourcePath, { params: urlParams });
        return response.data.results;
    }
}