import { User } from './models/User'

const user = new User({ name: 'Umair', age: 20 })
user.on('change', () => { 
  console.log('USER CHANGED')
})

user.trigger('change')