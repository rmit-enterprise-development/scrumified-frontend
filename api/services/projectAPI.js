import axiosClient from "../axiosClient";

const projectAPI = {
  getAllStories: (id) => {
    const url = `/projects/${id}/stories`;
    return axiosClient.get(url);
  },
};

export default projectAPI;
