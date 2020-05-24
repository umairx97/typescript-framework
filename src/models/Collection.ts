import { Events } from './Events'
import Axios, { AxiosResponse } from 'axios'
export class Collection<T, K> {
  models: T[] = []
  events: Events = new Events()

  constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T
  ) { }


  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  fetch(): void {
    Axios.get(this.rootUrl)
      .then((response: AxiosResponse) => {
        response.data.forEach((value: K) => {
          this.models.push(this.deserialize(value))
        });
        this.trigger('change')
      })


  }

}
