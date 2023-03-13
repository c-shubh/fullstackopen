import axios from "axios";
import { Person } from "../types";

const baseUrl = import.meta.env.VITE_API_URL;

const getAll = () => {
  return axios.get(`${baseUrl}/persons`).then((res) => res.data as Person[]);
};

const create = (person: Omit<Person, "id">) => {
  return axios.post(`${baseUrl}/persons`, person).then((res) => res.data);
};

const update = (id: Person["id"], newPerson: Omit<Person, "id">) => {
  return axios
    .put(`${baseUrl}/persons/${id}`, newPerson)
    .then((res) => res.data);
};

const delete_ = (id: Person["id"]) => {
  return axios.delete(`${baseUrl}/persons/${id}`).then((res) => res);
};

const personsService = {
  getAll,
  create,
  update,
  delete_,
};

export default personsService;
