import axios from "axios";
import { Person } from "../types";

const baseUrl = import.meta.env.VITE_API_URL;

const getAll = () => {
  return axios.get(`${baseUrl}/persons`).then((res) => res.data as Person[]);
};

const create = (person: Omit<Person, "id">) => {
  return axios.post(`${baseUrl}/persons`, person).then((res) => res.data);
};

const personsService = {
  getAll,
  create,
};

export default personsService;
