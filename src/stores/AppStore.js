import { observable, action } from 'mobx'
import axios from 'axios';

class AppStore {
    @observable welcomeMessage;

    constructor() {
        this.welcomeMessage = '';
    }

    @action setWelcomeMessage(message) {
        axios.get('api/test')
          .then(res => {
            this.welcomeMessage = res.data;
          })
          .catch(err => {
            console.error(err);
          });
    }
}

export default AppStore;
