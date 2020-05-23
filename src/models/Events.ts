type Callback = () => void

export class Events {
  events: { [key: string]: Callback[] } = {}

  // Event handler with any eventName and callback 
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  // To trigger an event from the events object and it's callbacks
  trigger(eventName: string): void {
    const handlers = this.events[eventName] || []
    if (!handlers || handlers.length === 0) return
    handlers.forEach(callback => callback())
  }
}