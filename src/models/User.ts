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
}
