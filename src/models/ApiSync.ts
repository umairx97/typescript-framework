import axios, { AxiosPromise } from 'axios'

interface HasId {
  id?: number
}
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {
    
  }
  
  // fetch the current user with an id
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/users/${id}`)
  }

  // Save data inside json server if the users already exists or create a new one 
  save(data: T): AxiosPromise {
    const { id: userId } = data
    if (userId) {
      return axios.put(`${this.rootUrl}/users/${userId}`, data)
    } else {
      return axios.post(`${this.rootUrl}/users`, data)
    }
  }
}