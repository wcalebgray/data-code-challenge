import Route from '@ember/routing/route';
import { getMoment } from '../helpers/format-date';

export default Route.extend({
  model(params) {
    let fileName = 'test.json';
    switch(parseInt(params.file_id)) {
      case 4:
        fileName = 'test4.json';
        break;
      case 3:
        fileName = 'test3.json';
        break;
      case 2:
        fileName = 'test2.json';
        break;
      default:
        break;
    }

    return fetch(fileName)
      .then(function (res) {
        // json() returns a promise that resolves to the data
        return res.json();
      })
      .then(function (file) {
        // sort by success/failure < inactive/in progress
        // then by end_date
        file["DATA"].sort((a,b) => {
          return (!!b.end_date - !!a.end_date) || (getMoment(a.end_date).diff(getMoment(b.end_date)));
        })

        return file["DATA"];
      })
      .catch(function(err){
        console.error("Error Fetching Data: ", err);
        return [{
          error: "Data Fetch Error Occurred; See Console for Details"
        }]
      })
  }
});