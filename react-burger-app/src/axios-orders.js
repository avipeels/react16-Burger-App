import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-avi-burger-8d320.firebaseio.com/',
});

export default instance;