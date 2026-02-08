import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllJobs = () => axios.get(`${API_URL}/jobs`);
export const getJobById = (id) => axios.get(`${API_URL}/jobs/${id}`);
export const deleteJob = (id) => axios.delete(`${API_URL}/jobs/${id}`);
export const createJob = (data) => axios.post(`${API_URL}/jobs`, data);
