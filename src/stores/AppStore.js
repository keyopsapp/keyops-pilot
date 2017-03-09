import { observable, action } from 'mobx'
import axios from 'axios';

class AppStore {
  @observable welcomeMessage;

  constructor() {
    this.welcomeMessage = '';
  }

  @action setWelcomeMessage(message) {
    axios.get('api/test/2')
    .then(res => {
      this.welcomeMessage = res.data.text;
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export default AppStore;
