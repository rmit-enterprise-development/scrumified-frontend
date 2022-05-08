import { useState, useEffect } from "react";
import userAPI from "../api/services/userAPI";
import { digFind } from "../utils/object";

const useFetchStory = (user, filter) => {
  const [taskList, setTaskList] = useState([]);

  const userId = user.logUserId ? user.logUserId : -1;

  const fetchAssignedTaskByUser = async () => {
    try {
      const response = await userAPI.getAllTasks(userId, filter);
      const data = response.data;
      const tasks = digFind(data, "content");

      setTaskList(tasks);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  useEffect(() => {
    fetchAssignedTaskByUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return taskList;
};

export default useFetchStory;
