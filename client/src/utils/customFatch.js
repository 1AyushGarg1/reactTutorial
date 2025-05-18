import axios from 'axios'

const customFatch = axios.create({
    baseURL: '/api/v1',
});

export default customFatch;