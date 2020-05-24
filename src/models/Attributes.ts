export class Attributes<T> {
  constructor(private data: T) { }

  // Get the property name from this.data either returns a string or a number 
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  // Sets a property on this.data 
  set(update: T): void {
    Object.assign(this.data, update)
  }

  getAll(): T {
    return this.data
  }
}