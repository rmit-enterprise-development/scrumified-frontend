import axiosClient from '../axiosClient';

const storyAPI = {
	getStory: (id) => {
		const url = `/stories/${id}`;
		return url;
	},

	/**
	 *
	 * @param {*} id storyId(Long)
	 * @param {*} params {userStory(String), category(String), point(int), status(String), assignId(Long)}
	 * @returns
	 */
	putStory: (id, data, params) => {
		const url = `/stories/${id}`;
		return axiosClient.put(url, data, { params });
	},

	deleteStory: (id) => {
		const url = `stories/${id}`;
		return axiosClient.delete(url);
	},
};

export default storyAPI;
