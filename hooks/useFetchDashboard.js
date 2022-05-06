import { useState, useEffect } from "react";
import userAPI from "../api/services/userAPI";
import { digFind } from "../utils/object";

const useFetchDashboard = (user) => {
  const [projectList, setProjectList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  const userId = user.logUserId ? user.logUserId : -1;

  const fetchProjectByUser = async () => {
    try {
      const params = {
        key: "",
        page: 0,
        limit: 10,
      };
      const response = await userAPI.getAllProjects(userId, params); // Mock data
      const data = response.data;
      const projects = digFind(data, "content");

      setProjectList(projects);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  const fetchAssignedTaskByUser = async () => {
    try {
      const params = {
        key: "",
        page: 0,
        limit: 10,
      };
      const response = await userAPI.getAllTasks(userId, params); // Mock data
      const data = response.data;
      const tasks = digFind(data, "content");

      setTaskList(tasks);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  useEffect(() => {
    fetchProjectByUser();
    fetchAssignedTaskByUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { projectList, taskList };
};

export default useFetchDashboard;
