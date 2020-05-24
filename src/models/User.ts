import axios, { AxiosResponse } from 'axios';
import { Events } from './Events'
import { Sync } from './Sync'
import { Attributes } from './Attributes'

export interface UserProps {
  name?: string
  age?: number
  id?: number
}

export class User {
  protected BASE_URL: string = `http://localhost:3000`
  public events: Events = new Events();
  public sync: Sync<UserProps> = new Sync<UserProps>(this.BASE_URL);
  public attributes: Attributes<UserProps>


  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

  set(update: UserProps) {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  // Upper level method for sync.fetch 
  fetch(): void {
    const id = this.attributes.get('id')
    if (typeof id !== 'number') throw new Error('Cannot fetch without an id')

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data)
    })
  }
}
