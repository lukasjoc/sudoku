import axios from "axios";
import nProgress from "nprogress"

// create a new axios instance
const client = axios.create({
  baseURL: "http://localhost:5050"
})

nProgress.configure({ minimum: 0.1 });
nProgress.configure({ showSpinner: false });

client.interceptors.request.use(config => {
  nProgress.start();
  return config;
});

client.interceptors.response.use(res => {
  nProgress.done();
  nProgress.remove();
  return res;
});

export default client
