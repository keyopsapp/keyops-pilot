import { observable, action } from 'mobx'
import axios from 'axios';

class ExampleStore {
  @observable people;
  @observable person;

  constructor() {
    this.people = [];
    this.person = {};
  }

  @action getPeople(people) {
    this.people = people;
  }

  @action getPerson(person) {
    this.person = person;
  }

  @action addPerson(person) {
    this.people = [...this.people, person];
  }

  @action updatePerson(nextPerson) {
    this.people = this.people.map(person => {
      if (person.id === nextPerson.id) {
        return nextPerson;
      }

      return person;
    });

    if (this.person.id === nextPerson.id) {
      this.person = nextPerson;
    }
  }

  @action deletePerson(id) {
    this.people = this.people.filter(person => {
      return person.id !== id
    });

    if (this.person.id === id) {
      this.person = {};
    }
  }
}

const exampleStore = new ExampleStore();

export default exampleStore;
export { ExampleStore };
