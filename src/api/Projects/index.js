import { API_URL } from "../../utils/constants";
import { axiosInstance } from "@/components/api/axios-instance";

class ProjectsApi {
  async createProject(values, userId) {
    const data = {
      userId: userId,
      projectName: values.projectName,
      projectDesc: values.description,
      projectDuration: '6 months',
      startDate: new Date(),
    };

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.post(`${API_URL.CREATE_PROJECT}/${userId}`, data).then((res) => {
          if (res.data.success) {
            resolve(res.data.message);
          } else {
            reject(new Error(res.data.error));
          }
        });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }

  async getProjects(userId) {

    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.get(`${API_URL.FECTH_PROJECTS}/${userId}`).then((res) => {
          if (res.data.success) {
            resolve(res.data.result);
          } else {
            reject(new Error(res.data.message));
          }
        });
      } catch (err) {
        reject(new Error(err.message));
      }
    });
  }
}

export const projectsApi = new ProjectsApi();
