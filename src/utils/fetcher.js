import axios from 'axios';
axios.defaults.withCredentials = false;
const fetcher = (url) => axios.get(url).then((response) => response.data);

export default fetcher;
