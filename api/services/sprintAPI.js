import axiosClient from "../axiosClient";

const sprintAPI = {
  getSprint: (id) => {
    const url = `/sprints/${id}`;
    return axiosClient.get(url);
  },

  /**
   * 
   * @param {*} id sprintId(Long)
   * @param {*} params {goal(String), status(String), defOfDone(String)}
   * @returns 
   */
  putSprint: (id, params) => {
    const url = `/sprints/${id}`;
    return axiosClient.put(url, params);
  },

  deleteSprint: (id) => {
    const url = `/sprints/${id}`;
    return axiosClient.delete(url);
  },

  putStory: (storyId, sprintId) => {
    const url = `/projects/${sprintId}/stories`;
    return axiosClient.put(url, storyId);
  },

  deleteStory: (storyId, sprintId) => {
    const url = `/projects/${sprintId}/stories`;
    return axiosClient.delete(url, storyId);
  }
  
};

export default sprintAPI;
