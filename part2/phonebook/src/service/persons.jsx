import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
  .then(response => response.data)
  .catch((error) => {
    console.error("Error getting the persons:", error);
  });;
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request
  .then(response => response.data)
  .catch((error) => {
    console.error("Error inserting the person:", error);
  });;
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
  .then(response => response.data)
  .catch((error) => {
    console.error("Error updating the person:", error);
  });
}

const deletebyId = (id) => {
  return axios
  .delete(`${baseUrl}/${id}`);
}

export default { getAll, create, update, deletebyId }