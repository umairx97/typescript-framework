import { User } from './models/User'

const user = User.buildUser({ name: 'umair', age: 22, id: 1 })

user.on('change', () => {
  console.log('Event triggered',)
})

user.fetch()
user.save()

