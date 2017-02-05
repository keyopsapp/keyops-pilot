import { observable, action } from 'mobx'

class AppStore {
    @observable welcomeMessage;

    constructor() {
        this.welcomeMessage = '';
    }

    @action setWelcomeMessage(message) {
        this.welcomeMessage = message;
    }
}

export default AppStore;
