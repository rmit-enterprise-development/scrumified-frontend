import axiosClient from "../axiosClient";

const userAPI = {
  getAll: (params) => {
    const url = "/users";
    return axiosClient.get(url, { params });
  },

  getOne: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  getProjects: (id) => {
    const url = `/users/${id}/projects`;
    return axiosClient.get(url);
  },

  /**
   *
   * @param {*} params {email(String), password(String)}
   * @returns
   */
  register: (params) => {
    const url = "/register";
    return axiosClient.post(url, params);
  },

  /**
   *
   * @param {*} params {email(String), password(String)}
   * @returns
   */
  login: (params) => {
    const url = `/login`;
    return axiosClient.post(url, params);
  },

  /**
   *
   * @param {*} id userId(Long)
   * @param {*} params {firstName(String), lastName(String), email(String), password(String)}
   * @returns
   */
  putUser: (id, params) => {
    const url = `/users/${id}`;
    return axiosClient.put(url, params);
  },

  deleteUser: (id) => {
    const url = `users/${id}`;
    return axiosClient.delete(url);
  },

  /**
   *
   * @param {*} id userId(Long)
   * @param {*} params {goal(String), status(String), defOfDone(String)}
   * @returns
   */
  postProject: (id, params) => {
    const url = `users/${id}/projects`;
    return axiosClient.post(url, params);
  },

  /**
   *
   * @param {*} key: String
   * @param {*} page: Int (start with 0)
   * @param {*} limit: Int (start with 4)
   * @returns
   */
  getAllProjects: (id, params) => {
    const url = `users/${id}/projects`;
    return axiosClient.get(url, { params });
  },
  /**
   *
   * @param {*} key: String
   * @param {*} page: Int (start with 0)
   * @param {*} limit: Int (start with 4)
   * @returns
   */
  getAllStories: (id, params) => {
    const url = `users/${id}/stories`;
    return axiosClient.get(url, { params });
  },
};

export default userAPI;
