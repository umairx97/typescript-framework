import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.buildUser({ name: "umair", age: 22 })
const root = document.getElementById('app')

if (root) {
  const userForm = new UserForm(root, user)
  userForm.render()
} else {
  throw new Error('Root element not found')
}
