import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const getEmployees = () => axios.get(`${API_URL}/users`);
export const getEmployee = (id) => axios.get(`${API_URL}/users/${id}`);
export const createEmployee = (employeeData) => axios.post(`${API_URL}/users`, employeeData);
export const updateEmployee = (id, employeeData) => axios.put(`${API_URL}/users/${id}`, employeeData);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/users/${id}`);
