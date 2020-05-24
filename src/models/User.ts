import axios, { AxiosResponse } from 'axios';
import { Model } from './Model';
import { Events } from './Events'
import { ApiSync } from './ApiSync'
import { Attributes } from './Attributes'

export interface UserProps {
  name?: string
  age?: number
  id?: number
}

const BASE_URL: string = `http://localhost:3000`
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Events(),
      new ApiSync<UserProps>(BASE_URL)
    )
  }
}


