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

export const health = async () => {
  const response = await graphApi.get({
    endpoint: 'health',
  });
  return response?.data || {};
};

export const getLogs = async () => {
  const response = await graphApi.get({
    endpoint: 'get_logs',
  });
  return response?.data || {};
};

/**
 * Load json graph
 * @param {{ url?: string, file?: BinaryData }} data
 * @returns graph data
 */
export const load = async (data) => {
  const response = await graphApi.upload({
    endpoint: 'load',
    data,
  });
  return response?.data || {};
};

/**
 * Focus node
 * @param {{ node: string, hop: number, origin: object }} data
 * @returns graph data
 */
export const focus = async (data) => {
  const response = await graphApi.post({
    endpoint: 'focus',
    data,
  });
  return response?.data || {};
};

/**
 * Cluster
 * @param {{ node: string, origin: object }} data
 * @returns graph data
 */
export const cluster = async (data) => {
  const response = await graphApi.post({
    endpoint: 'cluster',
    data,
  });
  return response?.data || {};
};

/**
 * Remove node or link
 * @param {{ element_id: string, element_type: 'link' | 'node', origin: object }} data
 * @returns graph data
 */
export const remove = async (data) => {
  const response = await graphApi.post({
    endpoint: 'delete',
    data,
  });
  return response?.data || {};
};

/**
 * Define concept
 * @param {{ concept: string, number_of_def: number }} params
 * @returns definitions array
 */
export const define = async (params) => {
  const response = await graphApi.get({
    endpoint: 'define',
    params,
  });
  return response?.data || {};
};

/**
 * Expand graph
 * @param {{ node: string, limit: number, origin: object }} data
 * @returns graph data
 */
export const expand = async (data) => {
  const response = await graphApi.post({
    endpoint: 'expand',
    data,
  });
  return response?.data || {};
};

/**
 * Fold graph
 * @param {{ node: string, long_names?: boolean, mult_relations?: boolean, origin: object }} data
 * @returns graph data
 */
export const fold = async (data) => {
  const response = await graphApi.post({
    endpoint: 'fold',
    data,
  });
  return response?.data || {};
};

/**
 * Abstract graph
 * @param {{ long_names?: boolean, mult_relations?: boolean, keep_relators?: boolean, origin: object }} data
 * @returns {Promise<{ graph: { nodes: array, links: array }, origin: object, constraints: array }>} graph data
 */
export const abstract = async (data = {}) => {
  data = {
    ...data,
    // abs_type: ['parthood', 'hierarchy', 'aspects'],
  }
  const response = await graphApi.post({
    endpoint: 'abstract',
    data,
  });
  return response?.data || {};
};
