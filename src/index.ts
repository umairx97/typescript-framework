import { User } from './models/User'

const user = new User({ name: 'Umair', age: 20 })

console.log(user.get('name'))
