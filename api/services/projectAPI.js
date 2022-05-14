import axiosClient from "../axiosClient";

const projectAPI = {
  getProject: (id) => {
    const url = `/projects/${id}`;
    return axiosClient.get(url);
  },

  /**
   *
   * @param {*} id projectId(Long)
   * @param {*} params {title(String), participantId(List<Long>)}
   * @returns
   */
  putProject: (id, params) => {
    const url = `/projects/${id}`;
    return axiosClient.put(url, params);
  },

  deleteProject: (id) => {
    const url = `/projects/${id}`;
    return axiosClient.delete(url);
  },

  /**
   *
   * @param {*} id projectId(Long)
   * @param {*} params {userStory(String), category(String), point(int), status(String), assignId(Long)}
   * @returns
   */
  postStory: (id, params) => {
    const url = `/projects/${id}/stories`;
    return axiosClient.post(url, params);
  },

  /**
   *
   * @param {*} id projectId(Long)
   * @param {*} params {userID(Int), page(Int), limit(Int)}
   * @returns
   */
  getAllStories: (id, params) => {
    const url = `/projects/${id}/stories`;
    return axiosClient.get(url, { params });
  },

  /**
   *
   * @param {*} id projectId(Long)
   * @param {*} params {goal(String), status(String), defOfDone(String)}
   * @returns
   */
  postSprint: (id, params) => {
    const url = `/projects/${id}/sprints`;
    return axiosClient.post(url, params);
  },

  getCurrentSprint: (id) => {
    const url = `/projects/${id}/sprints/current`;
    return axiosClient.get(url);
  },

  getAllSprints: (id) => {
    const url = `/projects/${id}/sprints`;
    return axiosClient.get(url);
  },

  getAllPoints: (id) => {
    const url = `/projects/${id}/status`;
    return axiosClient.get(url);
  },
};

export default projectAPI;
