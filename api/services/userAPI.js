import axiosClient from "../axiosClient";

const userAPI = {
  getAll: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getOne: (id) => {
    const url = `/users/${id}`;
    return url;
  },

  getProjects: (id) => {
    const url = `/users/${id}/projects`;
    return axiosClient.get(url);
  },

  register: (params) => {
    const url = "/register";
    return axiosClient.post(url, params);
  },
};

export default userAPI;
