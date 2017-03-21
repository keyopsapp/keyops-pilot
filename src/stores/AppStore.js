import { observable, action } from 'mobx'
import axios from 'axios';

class AppStore {
  @observable people;

  constructor() {
    this.people = [];
  }

  @action getThePeople(message) {
    axios.get('api/example')
    .then(res => {
      this.people = res.data;
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export default AppStore;
