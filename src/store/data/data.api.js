import { graphApi } from '../../services';
// import data from '../../response_g.json'

// function wait(milliseconds) {
//   return new Promise((resolve) => {
//     const timeout = setTimeout(() => {
//       resolve()
//       clearTimeout(timeout)
//     }, milliseconds)
//   });
// }

// export const loadData = async () => {
//   await wait(1000)
//   return data;
// };

export const loadData = async (data) => {
  const response = await graphApi.upload({
    endpoint: 'load',
    data,
  });
  return response?.data || {};
};
