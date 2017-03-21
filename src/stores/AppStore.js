import { observable, action } from 'mobx'
import axios from 'axios';

class AppStore {
  @observable vialProductCategories;

  constructor() {
    this.vialProductCategories = [];
  }

  @action getVialProductCategories() {
    axios.get('api/categories/biologic')
    .then(res => {
      this.vialProductCategories = res.data;
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export default AppStore;
