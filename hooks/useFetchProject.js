import { useState, useEffect } from "react";
import userAPI from "../api/services/userAPI";
import { digFind } from "../utils/object";

const useFetchProject = (user, filter) => {
  const [projectList, setProjectList] = useState([]);
  const [totalProject, setTotalProject] = useState(0);
  const userId = user.logUserId ? user.logUserId : -1;

  const fetchProjectByUser = async () => {
    try {
      const response = await userAPI.getAllProjects(userId, filter);
      const data = response.data;
      const projects = digFind(data, "content");

      setProjectList(projects);
      setTotalProject(data.totalElements);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  useEffect(() => {
    fetchProjectByUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { projectList, totalProject };
};

export default useFetchProject;
