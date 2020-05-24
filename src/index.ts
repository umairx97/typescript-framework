import { User } from './models/User'

const user = new User({ name: 'umair', age: 22, id: 1 })

user.attributes.get('name')
user.events.on('change', () => {
  console.log('Event triggered')
})

user.events.trigger('change')