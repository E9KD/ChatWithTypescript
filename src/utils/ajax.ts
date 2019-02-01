import axios from "axios";

// axios.defaults.baseURL = "/api";
// export class ajax {
//     get(url, data = {}) {
//         return new Promise((resolve, reject) => {
//             axios.get(url, data)
//                 .then(resolve)
//                 .catch(reject)
//         })

//     }
//     post(url, data = {}) {
//         return new Promise((resolve, reject) => {
//             axios.post(url, data)
//                 .then(resolve)
//                 .catch(reject)
//         })

//     }
// }

const Get = function(url: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res=>resolve(res.data))
      .catch(res=>reject(res.data));
  });
};

const Post = function(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => resolve(res))
      .catch(res => reject(res));
  });
};
export default {
  Get,
  Post
};
