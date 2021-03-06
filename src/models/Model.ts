import { AxiosPromise, AxiosResponse } from "axios";

export interface EventInterface {
  on(eventName: string, callback: () => void): void
  trigger(eventName: string): void
}

export interface SyncInterface<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

interface ModelAttributes<T> {
  set(value: T): void
  /* 
    T = UserProps 
    K = key on UserProps interface
    so T[K] means that `get` will return an object 
    which will include a key from UserProps interface 
    e.g UserProps['name']
  */
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
}

interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: EventInterface,
    private sync: SyncInterface<T>
  ) { }

  on = this.events.on
  get = this.attributes.get
  trigger = this.events.trigger

  set(update: T) {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  // Upper level method for sync.fetch 
  fetch(): void {
    const id = this.get('id')
    if (typeof id !== 'number') throw new Error('Cannot fetch without an id')

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data)
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse) => this.trigger('save'))
      .catch(() => this.trigger('error'))
  }
}