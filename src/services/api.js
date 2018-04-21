import axios from 'axios';
import constants from '../constants/constants';

class API {
  static getTodos = () => {
    return axios.get(constants.serverUrl).then(res => {
      return res.data;
    });
  };

  static createTodo = todo => {
    return axios.post(constants.serverUrl, todo).then(res => {
      return res.data;
    });
  };

  static deleteTodo = todoId => {
    return axios.delete(constants.serverUrl + '/' + todoId).then(res => {
      return res.data;
    });
  };

  static updateTodo = todo => {
    return axios.put(constants.serverUrl + '/' + todo._id, todo).then(res => {
      return res.data;
    });
  };

  static getTodosByStatus = status => {
    return axios
      .get(constants.serverUrl + '/filter?status=' + status)
      .then(res => {
        return res.data;
      });
  };

  static getTodosByTitle = title => {
    return axios
      .get(constants.serverUrl + '/filter?title=' + title)
      .then(res => {
        return res.data;
      });
  };

  static getTodosByStatusAndTitle = (status, title) => {
    return axios
      .get(constants.serverUrl + '/filter?title=' + title + '&status=' + status)
      .then(res => {
        return res.data;
      });
  };
}

export default API;
