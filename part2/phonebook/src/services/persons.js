import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const peopleService = {
  getAll: () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
  },

  create: (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(response => response.data);
  },

  remove: (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.status);
  },

  update: (id, personToUpdate) => {
    const request = axios.put(`${baseUrl}/${id}`, personToUpdate);
    return request.then(response => response.data);
  }
}

export default peopleService;