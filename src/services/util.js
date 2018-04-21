import _ from 'underscore';

class Util {
  static getColorForStatus = status => {
    switch (status) {
      case 'INPROGRESS':
        return '#ffdb99';
      case 'COMPLETE':
        return '#00cc00';
      default:
        return '#ff4d4d';
    }
  };

  static getReadableDateString = epochString => {
    let dateString = '';
    try {
      let date = new Date(parseInt(epochString, 10));
      dateString = date.toDateString();
    } catch (e) {
      console.log('error parsing date string: ' + e);
    }
    return dateString;
  };

  static getOverdueDateString = (epochString, status) => {
    let dateString = '';
    try {
      let overdue = parseInt(epochString, 10) + 86400000 < new Date().getTime();
      dateString = overdue && status !== 'COMPLETE' ? ' (OVERDUE)' : '';
    } catch (e) {
      console.log('error parsing date string: ' + e);
    }
    return dateString;
  };

  static getDateColor = (epochString, status) => {
    let color = '';
    try {
      let overdue = parseInt(epochString, 10) + 86400000 < new Date().getTime();
      color = overdue && status !== 'COMPLETE' ? '#ff4d4d' : 'black';
    } catch (e) {
      console.log('error parsing date string: ' + e);
    }
    return color;
  };

  static isLetter = str => {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
  };

  static sortTodosByDate = todos => {
    return _.sortBy(todos, 'dueDate');
  };
}

export default Util;
