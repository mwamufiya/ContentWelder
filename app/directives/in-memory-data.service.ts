export class InMemoryDataService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice', age: 23, gender: 'm'},
      {id: 12, name: 'Narco', age:null, gender:null},
      {id: 13, name: 'Bombasto', age:null, gender:null},
      {id: 14, name: 'Celeritas', age:null, gender:null},
      {id: 15, name: 'Magneta', age:null, gender:null},
      {id: 16, name: 'RubberMan', age: 82, gender:'f'},
      {id: 17, name: 'Dynama', age:null, gender:null},
      {id: 18, name: 'Dr IQ', age:null, gender:null},
      {id: 19, name: 'Magma', age:null, gender:null},
      {id: 20, name: 'Tornado', age:null, gender:null}
    ];
    return {heroes};
  }
}
