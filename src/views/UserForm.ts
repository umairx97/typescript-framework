import { User } from '../models/User'

export class UserForm {
  constructor(public parent: Element, public model: User) { }

  /**
  * This creates an object with the following structure
  * {eventName:HTMLElement: Function} 
  * OR 
  * {eventName:.className: Function}
  * this refers to what each element will do upon the 
  * triggered event, i.e if we have a button the following 
  * functions will be triggered according to selector
  */
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }
  template(): string {
    return ` 
      <div>
        <h1>User Form</h1>
        <div>User Name: ${this.model.get('name')}</div>
        <div>User Age: ${this.model.get('age')}</div>
        <input />
        <button> Click me </button>
        <button class="set-age"> Set Random Age </button>
      </div>
    `
  }


  /**
   * @param  {DocumentFragment} fragment
   * @returns void
   * @description - This function binds an event with the an html Element
   * what this function does is that it takes the events map object and extracts
   * the event name and the html select to bind the event to and adds an eventListener 
   * on it with the appropriate event name that was extracted from the objct 
   */
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()

    for (let eventKey in eventsMap) {
      // click:button format is split into an array of eventName and selector
      const [eventName, selector] = eventKey.split(':')

      // Every element of the type is then fixed with an event listener
      fragment.querySelectorAll(selector).forEach(elem => {
        elem.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  /**
   * @returns void
   * @description - Renders and html template element with event binding
   * and dummy template above
   */
  render(): void {
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content)
  }

}