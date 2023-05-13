import axios from 'axios';

const mockRequest = (mockResponse) => {
   const response = {
       data: mockResponse
   };
   return new Promise((resolve) => { 
       setTimeout(resolve.bind(null, response), 1000)
   });
}

const makeRequest = (url, method, queryParams = null, requestBody = null, options = null) => {
    if (options?.mockEnabled && options?.mockResponse) {
        return mockRequest(options.mockResponse);
    }

    return axios({
        method: method,
        url: url,
        params: queryParams,
        data: requestBody
    })
};

const makeGetRequest = (url, queryParams, options = null) => {
    return makeRequest(url, 'get', queryParams, null, options);
};

const makePostRequest = (url, queryParams, requestBody, options = null) => {
    return makeRequest(url, 'post', queryParams, requestBody, options);
};

const makePutRequest = (url, queryParams, requestBody, options = null) => {
    return makeRequest(url, 'put', queryParams, requestBody, options);
};

const makeDeleteRequest = (url, queryParams, requestBody, options = null) => {
    return makeRequest(url, 'delete', queryParams, requestBody, options);
};

export { makeGetRequest, makePostRequest, makePutRequest, makeDeleteRequest };
