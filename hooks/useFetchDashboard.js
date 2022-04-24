import { useState, useEffect } from "react";
import userAPI from "../api/services/userAPI";
import { digFind } from "../utils/object";

const useFetchDashboard = (userID) => {
  const [projectList, setProjectList] = useState([]);
  const [taskList, setTaskList] = useState({});

  const fetchProjectByUser = async () => {
    try {
      const params = {
        key: "",
        page: 0,
        limit: 10,
      };
      const response = await userAPI.getAllProjects(userID, params); // Mock data
      const data = response.data;
      const projects = digFind(data, "content");

      setProjectList(projects);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  const fetchAssignedTaskByUser = async (userID) => {
    try {
      const params = {
        key: "",
        page: 0,
        limit: 10,
      };
      const response = await userAPI.getAllTasks(userID, params); // Mock data
      const data = response.data;
      const tasks = digFind(data, "content");

      setTaskList(tasks);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  useEffect(() => {
    fetchProjectByUser(userID);
    fetchAssignedTaskByUser(userID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { projectList, taskList };
};

export default useFetchDashboard;
