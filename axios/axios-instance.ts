import axios from "axios";
// const API_BASE_URL = 'https://iseekblinds.flowrix.app/api/v1/'
// const API_KEY = '940d5360-56b6-42c3-810b-3186d1ebe3cc'
// const API_SECRET = 'VtFM7Ir5Vfn3EqjH5EpvvzRWyjW0npqvI1cbhNKIaZaOtZh4g7vd0Ba18zUjeM4ph0qP1LC1unlPzpzR2Tq1FgJC8xHBCzuy6FOqLD4jYxErdJPKVC2Mu4eH1uptnReydKhqmSHmdz3aBVVjq07moRpzHtDzQwZxHsDSwQ4czZpda34eFEXgYqrTtM0Gqr07a1sMgnvyvD7u214EybICivvJndKEZzBYVXu9r4C366KnF4kyn7PRC3IpkugBqASc'

// const API_BASE_URL = 'https://iseekblinds.dev.flowrix.app/api/v1/'
// const API_KEY = 'b70dce54-429c-485f-8fc0-192470337735'
// const API_SECRET = '3Gp9dkbANPWkLg5nsutDheH1WVmrzqlcnVJNk0PDrptx3xIWtyib9hcRr66zH84NRwUdHACTGSZo9Z8sA1eJm0zsCI34OrLeSobUEKhMqfgB7YWClRO5ZHLTE6R81k5zwIHSTtX7yXuqz3MGfjbLGZK7SVS4dwS58xiljtx9TloCIQISOsoIUE7VWu87mwsJqjrMxzpmPlXML6DSc7w5c7xHDpdYaQrQzNjlZkq5sILEDHlHSXSi6OeRZuSYD5uI'

// const API_BASE_URL = 'http://iseekblinds.localhost:8080/api/v1/'
// const API_KEY = 'b70dce54-429c-485f-8fc0-192470337735'
// const API_SECRET = '3Gp9dkbANPWkLg5nsutDheH1WVmrzqlcnVJNk0PDrptx3xIWtyib9hcRr66zH84NRwUdHACTGSZo9Z8sA1eJm0zsCI34OrLeSobUEKhMqfgB7YWClRO5ZHLTE6R81k5zwIHSTtX7yXuqz3MGfjbLGZK7SVS4dwS58xiljtx9TloCIQISOsoIUE7VWu87mwsJqjrMxzpmPlXML6DSc7w5c7xHDpdYaQrQzNjlZkq5sILEDHlHSXSi6OeRZuSYD5uI'

// const API_BASE_URL = 'https://iseekblinds-stg.flowrix.app/api/v1/'
// const API_KEY = '961ad121-bdce-444b-8dcb-18fe9582c6aa'
// const API_SECRET = 'i2jtMsRaXTI0O8kElqdg52HcfJAFkZ3AiUn45j4TONuUyqkq46JQbgPcMiWiVIDUNpH4NaBe8fuIQIZWwiy8D4kqsWXCRJrsqpIzCieFkF9YcZMoOXWqBtkM2VjnxXxVTp6EYevzH9KRp7jJuKE7AjZsFWbEbGxNOvo3DfL31yG7cxOjVndejhRUGFrLewWnbCkaGZq9MQAo7alQa0N72dR2dFYwID536tlXJ9UXkuEkw4lFi46Da1ndF80PAj62'

const API_BASE_URL = import.meta.env.VITE_FLOWRIX_API_BASE_URL
const API_KEY = import.meta.env.VITE_FLOWRIX_API_KEY
const API_SECRET = import.meta.env.VITE_FLOWRIX_API_SECRET

//cleint staging
// const API_BASE_URL = 'https://iseekblinds-stg1.flowrix.app/api/v1/'
// const API_KEY = '90da510a-7270-46c1-a0f9-cf922ba10ea2'
// const API_SECRET = '2wpy7rTGniJeisIJY4XF7wi8Vsxz5opbXKlxOrhvyxhfP3lFn7qm6ZfHu6rJj7dxnm5o40J2DBcWczdoNBbzzyy2ACi7OcveeqZg8Y2MuQoQYMUUP9VZjs4PnnMUzOVXsuWhNFuqg7YPXH1x8royU2xXoCh4kyZj3nifALlo2BCtCIt9BFe1SOQRsAK6ucd2ObJXZ59mZshCDTfSYU5EqkFQMJDV6HEuaMeGStLQZiR6jWVFINGPfSZRytGhpKx8'

const  axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "x-api-secret": API_SECRET,
    "Content-Encoding": "gzip",
  },
});

function accessToken() {
  return localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).access_token: "";
}
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log("Request interceptor:", config);
    const token = accessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["request-startTime"] = new Date().getTime();
    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Request error interceptor:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with successful response
    console.log("Response interceptor:", response);
    const currentTime = new Date().getTime();
    const startTime = response.config.headers["request-startTime"];
    response.headers["request-duration"] = currentTime - startTime;
    return response;
  },
  (error) => {
    // Do something with response error
    console.error("Response error interceptor:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance