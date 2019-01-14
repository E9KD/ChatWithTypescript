import axios from "axios";

axios.defaults.baseURL = '/api'
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

export const get = function(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, data)
      .then(resolve)
      .catch(reject);
  });
};
