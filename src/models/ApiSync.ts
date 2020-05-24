import axios, { AxiosPromise } from 'axios'

interface HasId {
  id?: number
}
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) { }

  // fetch the current user with an id
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/users/${id}`)
  }

  /** 
    @description - T is generic data type which will be given 
    to the class, in this case it will be UserProps interface
  */
  save(data: T): AxiosPromise {
    const { id: userId } = data
    if (userId) {
      return axios.put(`${this.rootUrl}/users/${userId}`, data)
    } else {
      return axios.post(`${this.rootUrl}/users`, data)
    }
  }
}