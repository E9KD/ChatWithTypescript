import axios from "axios";

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

const get = function(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, data)
      .then(resolve)
      .catch(reject);
  });
};
export default {
  get
};
