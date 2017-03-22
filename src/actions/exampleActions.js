import exampleStore from '../stores/ExampleStore';
import api from '../api';

export function getPeople() {
  api.exampleApi.getPeople()
    .then(res => exampleStore.getPeople(res))
    .catch(err => {
      console.error(err);
    });
}

export function getPerson(id) {
  api.exampleApi.getPerson(id)
    .then(res => exampleStore.getPerson(res))
    .catch(err => {
      console.error(err);
    });
}

export function createPerson(person) {
  api.exampleApi.createPerson(person)
    .then(res => exampleStore.addPerson(res))
    .catch(err => {
      console.error(err);
    });
}

export function updatePerson(id, person) {
  api.exampleApi.updatePerson(id, person)
    .then(res => exampleStore.updatePerson(res))
    .catch(err => {
      console.error(err);
    });
}

export function deletePerson(id) {
  api.exampleApi.deletePerson(id)
    .then(res => exampleStore.deletePerson(id))
    .catch(err => {
      console.error(err);
    });
}
