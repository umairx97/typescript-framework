import { Model } from './Model';
import { Events } from './Events'
import { ApiSync } from './ApiSync'
import { Attributes } from './Attributes'
import { Collection } from './Collection';

// property?: means that it's an optional property
export interface UserProps {
  name?: string
  age?: number
  id?: number
}

const BASE_URL: string = `http://localhost:3000`
export class User extends Model<UserProps> {
  // User factory builder with events and API functions
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Events(),
      new ApiSync<UserProps>(BASE_URL)
    )
  }

  // User collection factory builder with json deserializer
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      BASE_URL,
      (json: UserProps) => User.buildUser(json)
    )
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100)
    this.set({ age })
  }
}


