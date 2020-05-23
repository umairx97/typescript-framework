import { User } from './models/User'

const user = new User({ name: 'umair', age: 22, id: 1 })

user.fetch()

console.log(user)