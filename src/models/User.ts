import axios, { AxiosResponse } from 'axios';

interface UserProps {
  name?: string
  age?: number
  id?: number
}

const BASE_URL = `http://localhost:3000`

export class User {
  constructor(private data: UserProps) { }

  // Get the property name from this.data either returns a string or a number 
  get(propName: string): number | string {
    return this.data[propName]
  }

  // Sets a property on this.data 
  set(update: UserProps): void {
    Object.assign(this.data, update)
  }

  // fetch the current user with an id
  fetch(): void {
    axios.get(`${BASE_URL}/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data)
      })
  }

  // Save data inside json server if the users already exists or create a new one 
  save(): void {
    const userId = this.get('id')
    if (userId) {
      axios.put(`${BASE_URL}/users/${userId}`, this.data)
    } else {
      axios.post(`${BASE_URL}/users`, this.data)
    }
  }
}
